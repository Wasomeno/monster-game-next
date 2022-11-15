import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import AppContext from "../contexts/AppContext";
import { getUserStatus } from "../fetchers/fetchers";
import RegisterModal from "./modals/RegisterModal";
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
