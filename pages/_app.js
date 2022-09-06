import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout";
import AppContext from "../components/AppContext";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }) {
  const [account, setAccount] = useState([]);
  return (
    <AnimatePresence exitBeforeEnter={true}>
      <div className="bg-dark">
        <AppContext.Provider
          value={{
            account: account,
            setAccount: setAccount,
          }}
        >
          <Layout>
            <Component {...pageProps} />
            <ToastContainer position="bottom-center" closeOnClick={false} />
          </Layout>
        </AppContext.Provider>
      </div>
    </AnimatePresence>
  );
}

export default MyApp;
