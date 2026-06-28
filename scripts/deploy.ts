import { network } from "hardhat";

async function main() {
  const { viem } = await network.create();

  const counter = await viem.deployContract("Counter");
  console.log(`Counter contract successfully deployed to: ${counter.address}`);

  const token = await viem.deployContract("Token", []);
  console.log(`Token deployed to ${token.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
