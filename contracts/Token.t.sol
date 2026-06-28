// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import { Token } from './Token.sol';
import { Test } from "forge-std/Test.sol";

contract TokenTest is Test {
    Token token;
    address alice = address(0x02);

    function setUp() public {
        token = new Token();
    }

    function test_Mint() public {
        token.mint(address(this), 1000e18);
        assertEq(token.balanceOf(address(this)), 1000e18);
        assertEq(token.totalSupply(), 1000e18);
    }

    function test_Transfer() public {
        token.mint(address(this), 500e18);
        token.transfer(alice, 200e18);
        assertEq(token.balanceOf(alice), 200e18);
        assertEq(token.balanceOf(address(this)), 300e18);
    }

    function test_TransferInsufficuentBalance() public {
        // If ERC20 provides specific error, we can use it here to be more specific and accurate
        vm.expectRevert();
        token.transfer(alice, 1);
    }
}
