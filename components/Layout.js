import { useContext, useEffect } from "react";
import { useAccount } from "wagmi";
import AppContext from "../contexts/AppContext";
import Navigation from "./Navigations";
import NotConnected from "./NotConnected";

const Layout = ({ children }) => {
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!window.ethereum) return;
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
  }, []);

  return (
    <main className="bg-slate-900">
      {!isConnected ? (
        <NotConnected />
      ) : (
        <>
          <Navigation />
          {children}
        </>
      )}
    </main>
  );
};

export default Layout;
