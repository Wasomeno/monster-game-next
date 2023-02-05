import { createClient, configureChains } from "wagmi";
import { goerli } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [infuraProvider({ apiKey: "10d1de5267e944c0a6580f6a690283a7" })]
);

const client = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider,
  webSocketProvider,
});

export default client;
