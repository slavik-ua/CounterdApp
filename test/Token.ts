import { network } from "hardhat";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("Token", async () => {
  const { viem, networkHelpers } = await network.create();

  async function deployToken() {
    const token = await viem.deployContract("Token", ["NewToken", "NTK"]);
    return { token };
  }

  it("should mint tokens to owner", async () => {
    const { token } = await networkHelpers.loadFixture(deployToken);
    const [owner] = await viem.getWalletClients();

    const value = 1000n * 10n ** 18n;

    await token.write.mint([owner.account.address, value]);
    const balance = await token.read.balanceOf([owner.account.address]);
    assert.equal(balance, value);
  });

  it("should transfer tokens", async () => {
    const { token } = await networkHelpers.loadFixture(deployToken);
    const [owner, alice] = await viem.getWalletClients();

    await token.write.mint([owner.account.address, 500n * 10n ** 18n]);
    await token.write.transfer([alice.account.address, 200n * 10n ** 18n]);

    assert.equal(
      await token.read.balanceOf([alice.account.address]),
      200n * 10n ** 18n,
    );
    assert.equal(
      await token.read.balanceOf([owner.account.address]),
      300n * 10n ** 18n,
    );
  });
});
