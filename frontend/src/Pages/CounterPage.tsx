import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useEffect, useState } from "react";

import { abi } from "../../../artifacts/contracts/Counter.sol/Counter.json";

function CounterPage() {
  const [counterAddress, setCounterAddress] = useState(
    "0x5fbdb2315678afecb367f032d93f642f64180aa3",
  );

  const {
    data: count,
    refetch,
    error: readError,
  } = useReadContract({
    address: counterAddress as `0x${string}`,
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

      <input
        placeholder="Counter address"
        value={counterAddress}
        style={{ width: "40%" }}
        onChange={(e) => {
          setCounterAddress(e.target.value);
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          margin: "10px",
        }}
      >
        <button
          disabled={isPending || isConfirming}
          onClick={() =>
            writeContract({
              address: counterAddress as `0x${string}`,
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
              address: counterAddress as `0x${string}`,
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
