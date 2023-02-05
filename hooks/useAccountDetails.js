import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const useAccountDetails = () => {
  const account = useAccount();
  const [details, setDetails] = useState({
    address: "",
    isConnected: false,
    isReconnecting: false,
  });
  useEffect(() => {
    setDetails({
      address: account.address,
      isConnected: account.isConnected,
      isReconnecting: account.isReconnecting,
    });
  }, [
    account.address,
    account.isConnected,
    account.isReconnecting,
    account.status,
  ]);

  return details;
};

export default useAccountDetails;
