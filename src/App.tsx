import { StrictMode } from "react";
import { Router } from "@/Router";
import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

function App() {
  return (
    <StrictMode>
      <WagmiConfig config={config}>
        <Router />
      </WagmiConfig>
    </StrictMode>
  );
}

export default App;
