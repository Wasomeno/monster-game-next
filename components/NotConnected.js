import React, { useContext, useEffect, useState } from "react";
import AppContext from "../contexts/AppContext";
import { useToast } from "../stores/stores";
import { DangerButton, StartActivityButton } from "./Buttons";

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
      console.log(chainId);
      setChainId(hexConvert(chainId));
      if (hexConvert(chainId) !== 5) {
        toastError("Wrong Chain");
      }
    });
  }

  async function switchChainId() {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x5" }],
    });
  }

  useEffect(() => {
    getChainId();
  }, [chainId]);

  return (
    <div className="h-screen bg-slate-800 flex flex-col justify-center items-center">
      <div className="row justify-content-center align-items-center">
        <h1 className="p-2 text-white font-monogram text-2xl tracking-wide">
          Connect Your Wallet
        </h1>
      </div>
      <div className="flex justify-center items-center w-full">
        {chainId !== 5 ? (
          <StartActivityButton text="Connect" onClick={connectAccount} />
        ) : (
          <DangerButton text="Switch Chain" onClick={switchChainId} />
        )}
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
