import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import LoadingScreen from "../components/LoadingScreen";
import Toast from "../components/Toast";
import Layout from "../components/Layout";
import Head from "next/head";
import { queryClient } from "../contexts/reactQueryClient";
import AppContext from "../contexts/AppContext";

function MyApp({ Component, pageProps }) {
  const [account, setAccount] = useState([]);
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Monsters Game</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div className="bg-dark">
        <AppContext.Provider
          value={{
            account: account,
            setAccount: setAccount,
          }}
        >
          <Layout>
            <LoadingScreen />
            <Component {...pageProps} />
            <Toast />
          </Layout>
        </AppContext.Provider>
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
