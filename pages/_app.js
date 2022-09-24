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

function MyApp({ Component, pageProps }) {
  const [account, setAccount] = useState([]);
  const [setToastText, setCondition, toggleToast, Toast] = setToast();
  const [setLoadingText, toggleLoading, Loading] = setLoading();
  return (
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
              setToastText: setToastText,
              setCondition: setCondition,
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
  );
}

export default MyApp;
