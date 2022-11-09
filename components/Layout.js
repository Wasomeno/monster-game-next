import { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import Navigation from "./Navigations";
import NotConnected from "./NotConnected";

const Layout = ({ children }) => {
  const user = useContext(AppContext).account[0];
  const isConnected = Boolean(user);

  useEffect(() => {
    if (!window.ethereum) return;
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
  }, []);

  return (
    <>
      {!isConnected ? (
        <NotConnected />
      ) : (
        <>
          <Navigation />
          {children}
        </>
      )}
    </>
  );
};

export default Layout;
