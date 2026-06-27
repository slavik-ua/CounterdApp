import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { useEffect, useState } from "react";

const TOKEN_ABI = [
  // --- Variables ---
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ internalType: "address", name: "", type: "address" }],
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSuply",
    inputs: [],
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
  },

  // --- Methods ---
  {
    type: "function",
    name: "mint",
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transfer",
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
];

function TokenPage() {
  const { address } = useAccount();
  // Default address from hardhat node
  const [tokenAddress, setTokenAddress] = useState(
    "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
  );
  const [mintAmount, setMintAmount] = useState("");

  const { data: balance, refetch } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [address!],
    query: { enabled: !!tokenAddress && !!address },
  });

  // Blockchain listener. The writeContract function is needed to interract with the wallet
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  // Check when transaction changes status. We then can check isLoading if the transaction is still processing and isSuccess if it is done
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const handleMint = () => {
    if (!tokenAddress || !mintAmount || !address) return;
    writeContract({
      address: tokenAddress as `0x${string}`,
      abi: TOKEN_ABI,
      functionName: "mint",
      args: [address, BigInt(mintAmount)],
    });
  };

  useEffect(() => {
    if (isConfirmed) refetch();
  }, [isConfirmed, refetch]);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h3>Token Minting</h3>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          margin: "10px",
        }}
      >
        <input
          placeholder="Token address"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
        />
        <input
          placeholder="Amount"
          value={mintAmount}
          onChange={(e) => setMintAmount(e.target.value)}
        />
      </div>

      {balance !== undefined ? (
        <p>Balance: {balance?.toString()}</p>
      ) : (
        <p>Balance: Unknown</p>
      )}

      <button
        disabled={isPending || isConfirming || !tokenAddress || !mintAmount}
        onClick={handleMint}
      >
        {isPending || isConfirming ? "Confirming" : "Mint"}
      </button>

      {hash && <p style={{ fontSize: "14px" }}>Tx: {hash}</p>}
      {isConfirming && <p>Waiting</p>}
      {isConfirmed && <p style={{ color: "green" }}>Confirmed</p>}
      {error && (
        <p style={{ color: "red" }}>Error: {error.message || "Unknown"}</p>
      )}
    </div>
  );
}

export default TokenPage;
