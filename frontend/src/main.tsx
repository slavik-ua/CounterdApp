import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import { mainnet, sepolia, hardhat } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "Counter dAPP",
  projectId: "e87dc6497083fab197e454a98bc17b83",
  chains: [mainnet, sepolia, hardhat],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [hardhat.id]: http(),
  },
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
);
