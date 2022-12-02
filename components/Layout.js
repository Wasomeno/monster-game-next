import { watchNetwork } from "@wagmi/core";
import { useEffect } from "react";
import { useAccount, useNetwork } from "wagmi";
import Navigation from "./Navigations";
import NotConnected from "./NotConnected";

const Layout = ({ children }) => {
  const { chain } = useNetwork();
  const { isConnected } = useAccount();

  return (
    <main className="bg-slate-900">
      {!isConnected || chain.id !== 5 ? (
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
