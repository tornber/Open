// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {DecentrilizedStableCoin} from "../src/DecentrilizedStableCoin.sol";
import {DSCEngine} from "../src/DSCEngine.sol";
import {MockV3Aggregator} from "../test/mocks/MockV3Aggregator.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/ERC20Mock.sol";

contract HelperConfig is Script {
    struct NetworkConfig {
        address wethUSDPriceFeed;
        address wbtcUSDPriceFeed;
        address weth;
        address wbtc;
        uint256 deployerKey;
    }

    uint8 public constant DECIMALS = 8;
    int256 public constant ETH_USD_PRICE = 3000e8; // 3 000
    int256 public constant BTC_USD_PRICE = 70000e8; // 70 000
    int256 public constant DEFAULT_ANVIL_KEY = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;

    NetworkConfig public activeNetworkConfig;

    constructor() {
        if (block.chainid == 11155111) {
            activeNetworkConfig = getSepoliaConfig();
        } else {
            activeNetworkConfig = getOrCreateAnvilConfig();
        }
    }

    function getSepoliaConfig() public view returns(NetworkConfig memory) {
        return NetworkConfig({
        wethUSDPriceFeed: 0x694AA1769357215DE4FAC081bf1f309aDC325306,
        wbtcUSDPriceFeed: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43,
        weth: 0xdd13E55209Fd76AfE204dBda4007C227904f0a81,
        wbtc: 0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063,
        deployerKey: vm.envUint("PRIVATE_KEY")
        })
    }

    function getOrCreateAnvilConfig() public view returns(NetworkConfig memory) {
        if (activeNetworkConfig.wethUSDPriceFeed != address(0)) {
            return activeNetworkConfig;
        }
        
        vm.startBroadcast();
        MockV3Aggregator ethUSDPriceFeed = new MockV3Aggregator(DECIMALS,ETH_USD_PRICE);
        ERC20Mock wethMock = new ERC20Mock("WETH","WETH",msg.sender,100e8);
        MockV3Aggregator btcUSDPriceFeed = new MockV3Aggregator(DECIMALS,BTC_USD_PRICE);
        ERC20Mock wbtchMock = new ERC20Mock("WBTC","WBTC",msg.sender,100e8);
        
        return NetworkConfig({
            wethUSDPriceFeed: address(ethUSDPriceFeed),
            wbtcUSDPriceFeed: address(btcUSDPriceFeed),
            weth: address(wethMock),
            wbtc: address(wbtchMock),
            deployerKey: DEFAULT_ANVIL_KEY
        })
    }
}