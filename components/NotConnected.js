import React, { useContext, useEffect, useState } from "react";
import AppContext from "../contexts/AppContext";
import { useToast } from "../stores/stores";

const NotConnected = () => {
  const [toastSuccess, toastError] = useToast();
  const connection = useContext(AppContext);
  const [chainId, setChainId] = useState(5);

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
      if (hexConvert(chainId) !== 5) {
        toastError("Wrong Chain");
      }
    });
  }

  useEffect(() => {
    getChainId();
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
          disabled={chainId !== 5 ? true : false}
          className={
            chainId !== 5
              ? "col-2 btn rounded-pill btn-danger"
              : "col-2 btn rounded-pill btn-primary"
          }
          onClick={connectAccount}
        >
          <h3 id="text" className="m-0 text-white">
            Connect
          </h3>
        </button>
      </div>
      {chainId !== 5 ? (
        <div className="row justify-content-center align-items-center w-50 my-4">
          <h5 id="text" className="text-white">
            You're Connected to the Wrong Network
          </h5>
        </div>
      ) : null}
    </div>
  );
};

export default NotConnected;
