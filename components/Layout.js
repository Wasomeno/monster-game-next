import { useContext, useEffect } from "react";
import Navigation from "./Navigations";

const Layout = ({ children }) => {
  useEffect(() => {
    if (!window.ethereum) return;
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
  }, []);

  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default Layout;
