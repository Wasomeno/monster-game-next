import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const useAccountDetails = () => {
  const account = useAccount();
  const [details, setDetails] = useState({
    isConnected: false,
    isReconnecting: true,
  });

  useEffect(() => {
    setDetails({
      isConnected: account.isConnected,
      isReconnecting: account.isReconnecting,
    });
  }, [account.isReconnecting, account.isConnected]);

  return details;
};

export default useAccountDetails;
