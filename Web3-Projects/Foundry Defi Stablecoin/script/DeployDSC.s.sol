// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {DecentrilizedStableCoin} from "../src/DecentrilizedStableCoin.sol";
import {DSCEngine} from "../src/DSCEngine.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployDSC is Script {
    function run() external returns (DecentrilizedStableCoin, DSCEngine) {
        HelperConfig config = new HelperConfig();
        (wethUSDPriceFeed, wbtcUSDPriceFeed, weth, wbtc, deployerKey) = config.activeNetworkConfig;

        vm.startBroadcast();
        DecentrilizedStableCoin dsc = new DecentrilizedStableCoin();
        DSCEngine engine = new DSCEngine([weth, wbtc], [WethUSDPriceFeed, wbtcUSDPriceFeed], address(dsc));

        dsc.transferOwnership(address(engine));
        vm.stopBroadcast();
        return (dsc, engine);
    }
}
