import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout";
import AppContext from "../components/AppContext";
import { AnimatePresence } from "framer-motion";
import { setToast } from "../components/Toast";
import { setLoading } from "../components/LoadingScreen";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [account, setAccount] = useState([]);
  const [error, success, spinner, toggleSpinner, toggleToast, Toast] =
    setToast();
  const [setLoadingText, toggleLoading, Loading] = setLoading();
  return (
    <>
      <Head>
        <title>Monsters Game</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <AnimatePresence exitBeforeEnter={true}>
        <div className="bg-dark">
          <AppContext.Provider
            value={{
              account: account,
              setAccount: setAccount,
              loading: {
                setLoadingText: setLoadingText,
                toggleLoading: toggleLoading,
              },
              toast: {
                error: error,
                success: success,
                spinner: spinner,
                toggleSpinner: toggleSpinner,
                toggleToast: toggleToast,
              },
            }}
          >
            <Layout>
              <Loading />
              <Component {...pageProps} />
              <Toast />
            </Layout>
          </AppContext.Provider>
        </div>
      </AnimatePresence>
    </>
  );
}

export default MyApp;
