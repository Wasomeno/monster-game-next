import React, { useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";

const NotConnected = () => {
  const connection = useContext(AppContext);
  const toast = useContext(AppContext).toast;

  const [chainId, setChainId] = useState(0);

  async function connectAccount() {
    if (window.ethereum) {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      connection.setAccount(account);
    }
  }

  function hexConvert(hex) {
    return parseInt(hex, 16);
  }

  async function getChainId() {
    await window.ethereum.request({ method: "eth_chainId" }).then((chainId) => {
      setChainId(hexConvert(chainId));
    });
  }

  useEffect(() => {
    getChainId();
    if (chainId !== 5) {
      toast.error("Wrong Chain");
    }
  }, [chainId]);

  return (
    <div className="vh-100 bg-dark d-flex flex-column justify-content-center align-items-center h-100 w-100 text-center">
      <div className="row justify-content-center align-items-center">
        <h2 id="text" className="p-2 text-white">
          Connect Your Wallet
        </h2>
      </div>
      <div className="row justify-content-center align-items-center w-100">
        <button
          className={"col-2 btn rounded-pill btn-primary"}
          onClick={connectAccount}
        >
          <h3 id="text" className="m-0 text-white">
            Connect
          </h3>
        </button>
      </div>
    </div>
  );
};

export default NotConnected;
