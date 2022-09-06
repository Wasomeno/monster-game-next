import React, { useContext } from "react";
import AppContext from "./AppContext";

const NotConnected = () => {
  const connection = useContext(AppContext);
  async function connectAccount() {
    if (window.ethereum) {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      connection.setAccount(account);
    }
  }
  return (
    <div className="vh-100 bg-dark d-flex flex-column justify-content-center align-items-center h-100 w-100 text-center">
      <h2 className="p-2 text-white">Connect Your Wallet</h2>
      <div className="row justify-content-center align-items-center">
        <button
          className="btn btn-primary px-3 rounded-pill"
          onClick={connectAccount}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default NotConnected;
