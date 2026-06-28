import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useEffect } from "react";

import { abi } from "../../../artifacts/contracts/Counter.sol/Counter.json";

// Default address from Hardhat node
const CONTRACT_ADDRESS =
  "0x5fbdb2315678afecb367f032d93f642f64180aa3" as `0x${string}`;

function CounterPage() {
  const {
    data: count,
    refetch,
    error: readError,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: abi,
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

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h3>Counter</h3>
      <p>
        Value:{" "}
        <strong>{count !== undefined ? count?.toString() : "Loading"}</strong>
      </p>
      {readError && (
        <p style={{ color: "red" }}>Read Error: {readError.message}</p>
      )}

      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          disabled={isPending || isConfirming}
          onClick={() =>
            writeContract({
              address: CONTRACT_ADDRESS,
              abi: abi,
              functionName: "inc",
            })
          }
        >
          {isPending || isConfirming ? "Confirming" : "Increment"}
        </button>

        <button
          disabled={isPending || isConfirming || count?.toString() === "0"}
          onClick={() =>
            writeContract({
              address: CONTRACT_ADDRESS,
              abi: abi,
              functionName: "dec",
            })
          }
        >
          {isPending || isConfirming ? "Confirming" : "Decrement"}
        </button>
      </div>

      {hash && <p style={{ fontSize: "14px" }}>Tx: {hash}</p>}
      {isConfirming && <p>Waiting</p>}
      {isConfirmed && <p style={{ color: "green" }}>Confirmed</p>}
      {error && (
        <p style={{ color: "red" }}>Error: {error.message || "Unknown"}</p>
      )}
    </div>
  );
}

export default CounterPage;
