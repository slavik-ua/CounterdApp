# Counter dApp

A full-stack dApp with a Solidity smart contract, Hardhat 3 testing, and a React frontend (wagmi + RainbowKit).

## Setup

### Prerequisites

- Node.js 20+
- npm
- Metamask browser extension

### Install dependencies

```shell
npm install
cd frontend && npm install && cd ..
```

### Start the local Hardhat node

```shell
npx hardhat node
```

Keep this terminal running.

### Deploy the contract

In a **separate terminal**, run:

```shell
npx hardhat run scripts/deploy.ts
```

Copy the deployed address printed to the console.

### Configure the frontend

Open `frontend/src/App.tsx` and update `CONTRACT_ADDRESS` (line 28) with the address from the deploy step.

### Run the frontend

```shell
cd frontend && npm run dev
```

Open the URL shown (usually `http://localhost:5173`).

### Connect your wallet

1. In Metamask, add the **Hardhat Local** network:
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency Symbol: `ETH`
2. Import a Hardhat test account: use private key `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` (10000 ETH)
3. Connect the wallet to the dApp via the "Connect Wallet" button

---

## Techical Decisions
- **Hardhat 3 + viem** - Chosen for native ESM support and compile-time type safety from ABIs.
- **Solidity tests for unit logic and TypeScript for integration** - Solidity tests run faster and catch contract-level bugs in the EVM. TypeScript tests cover the end-to-end flow.
- **wagmi + RainbowKit** - Industry-standard React stack for wallet connection and contract interaction.

## Testing

```shell
npx hardhat test
```

Selectively run Solidity or TypeScript tests:

```shell
npx hardhat test solidity
npx hardhat test nodejs
```

## Deployment to Sepolia

Requires a funded Sepolia account. Set the private key:

```shell
npx hardhat keystore set SEPOLIA_PRIVATE_KEY
```

Then deploy:

```shell
npx hardhat ignition deploy --network sepolia ignition/modules/Counter.ts
```
