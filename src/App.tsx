import { StrictMode } from "react";
import { Router } from "@/Router";
import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "Twype",
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Twype",
        shimDisconnect: true,
      },
    }),
  ],
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
