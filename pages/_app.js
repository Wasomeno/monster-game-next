import "../styles/globals.css";

import { QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import { WagmiConfig } from "wagmi";

import Layout from "../components/Layout";
import LoadingScreen from "../components/LoadingScreen";
import Toast from "../components/Toast";
import { queryClient } from "../contexts/reactQueryClient";
import wagmiClient from "../contexts/wagmiClient";

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Monsters Game</title>
          <meta property="og:title" content="My minigame project" key="title" />
          <link rel="icon" href="/icons/map_icon.png" />
          <link rel="shortcut icon" href="/icons/map_icon.png" />
        </Head>
        <Layout>
          <LoadingScreen />
          <Component {...pageProps} />
          <Toast />
        </Layout>
      </QueryClientProvider>
    </WagmiConfig>
  );
}

export default MyApp;
