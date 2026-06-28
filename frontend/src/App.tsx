import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import CounterPage from "./Pages/CounterPage";
import TokenPage from "./Pages/TokenPage";

function App() {
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [page, setPage] = useState<"counter" | "token">("counter");

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Universal DApp</h1>
      <h3>You can do anything with the blockchain</h3>

      {isConnected ? (
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <p title={address}>
            Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
          <button
            onClick={() => {
              disconnect();
            }}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button onClick={() => connect({ connector: injected() })}>
          Connect Wallet
        </button>
      )}

      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          margin: "20px",
        }}
      >
        <button
          onClick={() => setPage("counter")}
          style={{
            fontWeight: page === "counter" ? "bold" : "normal",
          }}
        >
          Counter
        </button>
        <button
          onClick={() => setPage("token")}
          style={{ fontWeight: page === "token" ? "bold" : "normal" }}
        >
          Token
        </button>
      </nav>

      {page === "counter" ? <CounterPage /> : <TokenPage />}

      <div
        style={{
          position: "fixed",
          bottom: "2%",
          width: "40%",
          textAlign: "left",
          fontSize: "0.8rem",
          border: "1px solid gray",
          padding: "20px",
        }}
      >
        <h3>Security tips for users:</h3>
        <ol style={{ color: "red" }}>
          <li>
            Be careful about the clipboard hijacking. The attack malware uses to
            change the wallet address you copy to your clipboard.
            <strong style={{ color: "white" }}>
              Always check if the wallet address is correct.
            </strong>
            Checking only first and last symbols is not enough.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default App;
