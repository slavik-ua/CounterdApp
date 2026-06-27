# dApp

A full-stack dApp with Solidity smart contracts, Hardhat 3 testing, and a React frontend (wagmi).

## Contracts

| Contract | File | Description |
|----------|------|-------------|
| **Counter** | `contracts/Counter.sol` | Simple counter with `inc()` and `incBy()`, emits `Increment` event |
| **Token** | `contracts/Token.sol` | Custom ERC20-like token with `mint` (owner-only), `transfer`, `balanceOf` |

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

### Deploy the contracts

In a **separate terminal**, deploy each contract:

```shell
npx hardhat run scripts/deploy.ts --network localhost
```

Copy the printed addresses and update them in `frontend/src/Pages/CounterPage.tsx` and `frontend/src/Pages/TokenPage.tsx`.

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
3. Click "Connect Wallet" in the dApp and approve in Metamask
4. Use the **Counter** tab to increment the counter, or the **Token** tab to mint tokens

---

## Technical Decisions

- **Honest Reflection**: As I mentioned in my application email, I am new to Web3 and have used generative AI to help me understand how to build dApps. While AI helped me, I understand the flow from Hardhat local node to the Wagmi frontend.
- **Hardhat + Typescript**: Used to compile contracts, deploy them and run tests.
- **wagmi**: Chosen as the library to handle wallet connection.

## Testing

```shell
npx hardhat test
```

Selectively run Solidity or TypeScript tests:

```shell
npx hardhat test solidity
npx hardhat test nodejs
```

## Future Directions

- **Full ERC20** — Add `approve()` + `transferFrom()` + `Approval` event to enable third-party token transfers (DEX, marketplace patterns).
- **OpenZeppelin** — Replace custom token with `@openzeppelin/contracts` ERC20 for production-ready security.
- **Multi-page frontend** — Use react-router-dom for proper URL-based navigation instead of state tabs.
