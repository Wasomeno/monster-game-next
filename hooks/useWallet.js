import { useEffect, useState } from "react";

export const useWallet = () => {
  const [isInstalled, setIsInstalled] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setInterval(() => {
      if (window.ethereum) {
        setIsInstalled(true);
      } else {
        setIsInstalled(false);
      }
      setLoading(false);
    }, 1000);
  }, []);

  return { isInstalled: isInstalled, isLoading: isLoading };
};
