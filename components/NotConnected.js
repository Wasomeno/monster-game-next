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
      <div className="row justify-content-center align-items-center">
        <h2 id="text" className="p-2 text-white">
          Connect Your Wallet
        </h2>
      </div>
      <div className="row justify-content-center align-items-center w-100">
        <button
          className="col-2 btn btn-primary  rounded-pill"
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
