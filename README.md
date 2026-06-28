# dApp

A full-stack dApp with Solidity smart contracts, Hardhat 3 testing, and a React frontend (wagmi).

## Setup

### Prerequisites

- Node.js 22+
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

If the addresses are different from
`0x5fbdb2315678afecb367f032d93f642f64180aa3`
`0xe7f1725e7734ce288f8367e1bb143e90bb3f0512`

Copy the printed addresses and update it in `frontend/src/Pages/CounterPage.tsx`. The Token hash **can be updated in the UI** or in the `frontend/src/Pages/TokenPage.tsx`.

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
4. Use the **Counter** tab to increment the counter, or the **Token** tab to mint ERC20 tokens

---

## Technical Decisions

- **Learning Process**: As I mentioned in my application email, I am new to blockchain development and have used llms to help me understand dApp concepts and how they work. While it helped me learn dApp concepts, **I was writing the code. Through 24 commits, I was learning and now I understand the flow from Hardhat local node to the Wagmi frontend, and can explain and defend the code.**
- **Hardhat + Typescript**: Were chosen because of the amount of information avaialable and strict typesafety which allows for early bug detection. Hardhat is a popular tool to compile contracts, deploy them on the local test network and run solidity tests.
- **Vite and React**: Were chosed for the frontend because they are the most popular and have the most documentation available on them.
- **wagmi**: Chosen as the popular library to handle wallet connection to the frontend.
- **@openzeppelin**: solidity erc20 token library. Was chosen because that is the most common way to it, as it provides all methods ready like balanceOf, mint and we just inherit from that contract.

## Testing

```shell
npx hardhat test
```

Selectively run Solidity or TypeScript tests:

```shell
npx hardhat test solidity
npx hardhat test nodejs
```

Tests are located in
- `./contracts/*.t.sol` - solidity tests
- `./test/*` - node tests
