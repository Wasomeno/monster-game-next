import "../styles/globals.css";
import { useEffect, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import LoadingScreen from "../components/LoadingScreen";
import Toast from "../components/Toast";
import Layout from "../components/Layout";
import Head from "next/head";
import { queryClient } from "../contexts/reactQueryClient";
import SorryPage from "../components/SorryPage";
import { WagmiConfig } from "wagmi";
import wagmiClient from "../contexts/wagmiClient";

function MyApp({ Component, pageProps }) {
  const [account, setAccount] = useState([]);
  const [width, setWidth] = useState(1000);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, [width]);

  return width > 1000 ? (
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
  ) : (
    <SorryPage />
  );
}

export default MyApp;
