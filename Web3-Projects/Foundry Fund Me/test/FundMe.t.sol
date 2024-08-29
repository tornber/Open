// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test, console} from "forge-std/Test.sol";
import {FundMe} from "../src/FundMe.sol";
import {DeployFundMe} from "../script/FundMe.s.sol";

contract FundMeTest is Test {
    DeployFundMe dfm;
    FundMe fundMe;
    address USER = makeAddr("user");
    uint256 constant SEND_VALUE = 0.1 ether;
    uint256 constant STARTING_BALANCE = 10 ether;
    uint constant GAS_PRICE = 1;

    function setUp() external {
        // fundMe = new FundMe();
        dfm = new DeployFundMe();
        fundMe = dfm.run();
        vm.deal(USER, STARTING_BALANCE);
    }

    function testMinimumDollarIsFive() public {
        assertEq(fundMe.MINIMUM_USD(), 5e18);
    }

    function testIsOwnerMsgSender() public {
        assertEq(fundMe.i_owner(), msg.sender);
    }

    function testPriceFeedVersionCheck() public {
        assertEq(fundMe.getVersion(), 4);
    }

    function testFundFailsWithoutEnoughtEth() public {
        vm.expectRevert();
        fundMe.fund();
    }

    function testFundUpdatesFundingDataStructures() public {
        vm.prank(USER); // next transaction will be sent from this address
        fundMe.fund{value: SEND_VALUE}();
        uint256 amount = fundMe.getAddressToAmountFunded(USER);
        address funderInArray = fundMe.getFunder(0);
        assertEq(funderInArray, USER);
        assertEq(amount, SEND_VALUE);
    }
}
