import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";

const CONTRACT_ABI = [
  {
    inputs: [],
    name: "inc",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "x",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

const CONTRACT_ADDRESS =
  "0x5fbdb2315678afecb367f032d93f642f64180aa3" as `0x${string}`;

function App() {
  const { isConnected } = useAccount();

  const { data: count, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "x",
  });

  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
      refetch();
    }
  }, [isConfirmed, refetch]);

  const handleIncrement = () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "inc",
    });
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Counter DApp</h1>

      <ConnectButton />

      {isConnected ? (
        <div style={{ marginTop: "30px" }}>
          <h3>Contract Interaction</h3>
          <p>
            Current Counter Value:{" "}
            <strong>
              {count !== undefined ? count.toString() : "Loading"}
            </strong>
          </p>

          <button
            disabled={isPending || isConfirming}
            onClick={handleIncrement}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {isPending || isConfirming
              ? "Confirming in Wallet"
              : "Increment Counter"}
          </button>

          {hash && (
            <p style={{ fontSize: "14px", color: "gray" }}>Tx Hash: {hash}</p>
          )}
          {isConfirming && <p>Waiting for network confirmation...</p>}
          {isConfirmed && (
            <p style={{ color: "green" }}>
              Transaction confirmed! Counter updated.
            </p>
          )}
          {error && (
            <p style={{ color: "red" }}>
              Error: {error.shortMessage || error.message}
            </p>
          )}
        </div>
      ) : (
        <p style={{ marginTop: "20px" }}>
          Please connect your wallet to interact with the contract.
        </p>
      )}
    </div>
  );
}

export default App;
