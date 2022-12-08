import { useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import useAccountDetails from "../hooks/useAccountDetails";
import { useUserStatus } from "../lib/queries/useUserDetails";
import Navigation from "./Navigations";
import NotConnected from "./NotConnected";
import NotRegisteredModal from "./Register/NotRegisteredModal";

const Layout = ({ children }) => {
  const [userStatus, setUserStatus] = useState(true);
  const accountDetails = useAccountDetails();
  const { data, isFetching } = useUserStatus();

  useEffect(() => {
    if (!isFetching) setUserStatus(data);
    console.log(data, userStatus);
  }, [data]);

  return (
    <>
      {accountDetails.isReconnecting && (
        <div className="w-screen h-screen bg-slate-900 bg-opacity-90 flex items-center justify-center">
          <MoonLoader
            loading={accountDetails.isReconnecting}
            color="white"
            size={50}
          />
        </div>
      )}

      {isFetching && (
        <div className="w-screen h-screen bg-slate-900 bg-opacity-90 flex items-center justify-center">
          <MoonLoader loading={isFetching} color="white" size={50} />
        </div>
      )}

      {!accountDetails.isConnected && <NotConnected />}

      {accountDetails.isConnected && !isFetching && userStatus && (
        <main className="bg-slate-900">
          <Navigation />
          {children}
        </main>
      )}

      {accountDetails.isConnected && !isFetching && !userStatus && (
        <NotRegisteredModal />
      )}
    </>
  );
};

export default Layout;
