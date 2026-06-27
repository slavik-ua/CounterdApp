import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { network } from "hardhat";
import { count } from "node:console";

describe("Counter", async () => {
  const { viem, networkHelpers } = await network.create();

  async function deployContract() {
    const counter = await viem.deployContract("Counter");
    return { counter };
  }

  it("Init counter to 0", async () => {
    const { counter } = await networkHelpers.loadFixture(deployContract);
    const value = await counter.read.x();
    assert.equal(value, 0n);
  });

  it("Increment the count and emit an event", async () => {
    const { counter } = await networkHelpers.loadFixture(deployContract);
    await viem.assertions.emit(counter.write.inc(), counter, "Increment");
    const currentCount = await counter.read.x();
    assert.equal(currentCount, 1n);
  });

  it("Increment and Decrement the counter", async function () {
    const { counter } = await networkHelpers.loadFixture(deployContract);
    await viem.assertions.emit(counter.write.inc(), counter, "Increment");
    await viem.assertions.emit(counter.write.dec(), counter, "Decrement");

    const currentCount = await counter.read.x();
    assert.equal(currentCount, 0n);
  });
});
