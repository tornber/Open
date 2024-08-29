// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20Burnable, ERC20} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title DecentrilizedStableCoin
 * @author Tornike Beridze
 * Collateral: Exogonous (ETC & BTC)
 * Minting: Algorithmic
 * Relative Stability: Pegged to USD
 */
contract DecentrilizedStableCoin {
    error DecentrilizedStableCoin__MustBeMoreThanZero();
    error DecentrilizedStableCoin__BurnAmountExceedsBalance();
    error DecentrilizedStableCoin__NotZeroAddress();

    constructor() ERC20("DecentrilizedStableCoin", "DSC") {}

    function burn(uint256 _amount) public override onlyOwner {
        if (_amount <= 0) {
            revert DecentrilizedStableCoin__MustBeMoreThanZero();
        }
        uint256 balance = balanceOf(msg.sender);
        if (balance < _amount) {
            revert DecentrilizedStableCoin__BurnAmountExceedsBalance();
        }
        super.burn(_amount);
    }

    function mint(
        address _to,
        uint256 _amount
    ) external onlyOwner returns (bool) {
        if (_to == address(0)) {
            revert DecentrilizedStableCoin__NotZeroAddress();
        }
        if (_amount <= 0) {
            revert DecentrilizedStableCoin__MustBeMoreThanZero();
        }
        _mint(_to, _amount);
        return true;
    }
}
