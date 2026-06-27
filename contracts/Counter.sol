// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Counter {
  uint public x;

  event Increment(uint by);
  event Decrement(uint by);

  function inc() public {
    x++;
    emit Increment(1);
  }

  function incBy(uint by) public {
    require(by > 0, "incBy: increment should be positive");
    x += by;
    emit Increment(by);
  }

  function dec() public {
    require(x > 0, "dec: should be greater than 0, otherwise underflow");
    x--;
    emit Decrement(1);
  }

  function decBy(uint by) public {
    require(by > 0, "incBy: increment should be positive");
    if (x < by) {
        x = 0;
    } else {
        x -= by;
        emit Decrement(by);
    }
  }
}
