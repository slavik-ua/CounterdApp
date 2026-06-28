import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { useEffect, useState } from "react";

import { abi } from "../../../artifacts/contracts/Token.sol/Token.json";

function TokenPage() {
  const { address } = useAccount();
  const [tokenAddress, setTokenAddress] = useState(
    "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
  );
  const [mintAmount, setMintAmount] = useState("");

  const {
    data: balance,
    refetch,
    error: readError,
  } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: abi,
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
      abi: abi,
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

      {balance !== undefined ? (
        <p>Balance: {balance?.toString()}</p>
      ) : (
        <p>Balance: Unknown</p>
      )}

      {readError && (
        <p style={{ color: "red" }}>Read Error: {readError.message}</p>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "40%",
          gap: "10px",
          margin: "10px auto",
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
          type="number"
          onChange={(e) => setMintAmount(e.target.value)}
        />
      </div>

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
