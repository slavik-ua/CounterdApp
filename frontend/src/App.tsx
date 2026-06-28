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
        <div>
          <p>
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
        <h3>Useful tips for users:</h3>
        <ol>
          <li>
            Be careful about the clipping attack. The attack hackers use to
            change your the wallet address after you copy it to your clipboard.
            Always check if the <strong>wallet address</strong> is correct.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default App;
