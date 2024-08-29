// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20Burnable, ERC20} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {DecentrilizedStableCoin} from "./DecentrilizedStableCoin.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 * @title DSCEngine
 * @author Tornike Beridze
 *
 * token should maintaint  1 token == 1$ peg
 *
 * @notice This Contract is the core of DSC system. it handles all the logic for mining and redeeming DSC,
 * as well as depositing & withdrawing collateral.
 * @notice This contract is Very loosely based on the MakerDAO DSS (DAI) system.
 */
contract DSCEngine {
    ///////////////////
    //   Errors      //
    ///////////////////
    error DSCEngine__NeedsBeMoreThanZero();
    error DSCEngine__TokenAndPriceFeedAddressesMustBeSameLength();
    error DSCEngine__TokenNotAllowed();
    error DSCEngine__TransferFailed();
    error DSCEngine__BreaksHealthFactor(uint256 userHealthFactor);
    error DSCEngine__MintFailed();

    /////////////////////////
    //  State Variables    //
    /////////////////////////
    mapping(address token => address priceFeed) s_priceFeed;
    mapping(address user => mapping(address token => uint256 amount)) private s_collateralDeposited;
    mapping(address user => uint256 amountDscMinted) private s_DSCMinted;
    address[] private s_collateralTokens;
    DecentrilizedStableCoin private immutable i_dsc;
    uint256 private constant LIQUIDATION_THRESHOLD = 50;
    uint256 private constant LIQUIDATION_PRECISION = 100;
    uint256 private constant MIN_HEALTH_FACTOR = 1;

    ///////////////////
    //   Events      //
    ///////////////////
    event CollateralDeposited(address indexed depositor, address indexed tokenAddress, uint256 collateralAmount);

    ///////////////////
    //   Modifier    //
    ///////////////////
    modifier moreThanZero(uint256 amount) {
        if (amount == 0) {
            revert DSCEngine__NeedsMoreThanZero();
        }
        _;
    }

    modifier isAllowedToken(address token) {
        if (s_priceFeed[token] == address(0)) {
            revert DSCEngine__TokenNotAllowed();
        }
        _;
    }

    ///////////////////
    //   Functions   //
    ///////////////////
    constructor(address[] memory tokenAddresses, address[] memory priceFeedAddresses, address dscAddress) {
        if (tokenAddresses.length != priceFeedAddresses.length) {
            revert DSCEngine__TokenAndPriceFeedAddressesMustBeSameLength();
        }
        // USD Price Feeds
        // USD / ETH, USD / BTC, etc
        for (uint256 i = 0; i < tokenAddresses.length; i++) {
            s_priceFeed[tokenAddresses[i]] = priceFeedAddresses[i];
            s_collateralTokens.push(tokenAddresses[i]);
        }
        i_dsc = DecentrilizedStableCoin(dscAddress);
    }

    /////////////////////////
    //  External Functions //
    /////////////////////////
    function depositCollateralAndMintDsc(address tokenCollateralAddress, uint256 amountCollateral)
        external
        moreThanZero(amountCollateral)
        isAllowedToken(tokenCollateralAddress)
        nonReentrant
    {
        s_collateralDeposited[msg.sender][tokenCollateralAddress] += amountCollateral;
        emit CollateralDeposited(msg.sender, tokenCollateralAddress, amountCollateral);
        bool success = IERC20(tokenCollateralAddress).transferFrom(msg.sender, address(this), amountCollateral);
        if (!success) {
            revert DSCEngine__TransferFailed();
        }
    }

    function depositCollateral() external {}

    function reedemCollateralForDsc() external {}

    function reedemCollateral() external {}

    function mintDsc(uint256 amountDscToMint) external {
        s_DSCMinted[msg.sender] = amountDscToMint;
        revertIfHealthFactorIsBroken();
        bool minted = i_dsc.mint(msg.sender,amountDscToMint);
        if (!minted) {
            revert DSCEngine__MintFailed();
        }
    }

    function burnDsc() external {}

    function liquidate() external {}

    function getHealthFactor() external view {}


    /////////////////////////
    //  Private and Internal Functions //
    /////////////////////////
    function _revertIfHealthFactorIsBroken(address user) internal view {
        uint256 userHealthFactor = _healthFactor(user);
        if (userHealthFactor < MIN_HEALTH_FACTOR) {
            revert DSCEngine__BreaksHealthFactor(userHealthFactor);
        }

    }

    function _getAccountInformation(address user) private view returns (uint256 totalDSCMinted, uint256 collateralValueInUSD) {
        totalDSCMinted = s_DSCMinted[user];
        collateralValueInUSD = getAccountCollateralValue(user);
    }

    function _healthFactor(address user) private view returns (uint256) {
        (uint256 totalDSCMinted, uint256 collateralValueInUSD) = _getAccountInformation(user);
        uint256 collateralAdjustedForThreshold = (collateralValueInUSD * LIQUIDATION_THRESHOLD) / LIQUIDATION_PRECISION;
        return (collateralAdjustedForThreshold * 1e18) / totalDSCMinted;
    }

    /////////////////////////
    //  Public and External View Functions //
    /////////////////////////
    function getAccountCollateralValue(address user) public view returns (uint256) {
        uint256 totalValue;
        for (uint256 i = 0; i < s_collateralTokens.length; i++) {
            address token = s_collateralTokens[i]
            address amount = s_collateralDeposited[user][token];
            totalValue += getUSDValue(token,amount);
        }
    }

    function getUSDValue(address token, uint256 amount) public view returns(uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(s_priceFeed[token])
        (,int256 price,,,) = priceFeed.latestRoundData();
        return ((price * 1e10) * amount) / 1e18;
    }
}
