import { BarLoader } from "react-spinners";
import { useAccount } from "wagmi";

import { useUserStatus } from "@/components/reactQuery/queries/useUserDetails";

import ClientLayout from "./ClientLayout";
import Navigation from "./Navigations";
import NotConnected from "./NotConnected";
import NotRegisteredModal from "./Register/NotRegisteredModal";

const Layout = ({ children }) => {
  const accountDetails = useAccount();
  const userStatus = useUserStatus(accountDetails.address);
  return (
    <ClientLayout>
      {accountDetails.isConnected ? (
        <main className="bg-slate-900">
          {userStatus.isLoading && (
            <div className="relative flex h-screen flex-col items-center justify-center gap-4 bg-slate-900 bg-opacity-90">
              <p
                classNa
                me="font-monogram m-2 p-2 text-center text-xl text-white"
              >
                Fetching User Status
              </p>
              <BarLoader
                loading={userStatus.isLoading}
                color="grey"
                size={50}
              />
            </div>
          )}
          {!userStatus.isLoading &&
            (userStatus.status ? (
              <>
                <Navigation />
                {children}
              </>
            ) : (
              <NotRegisteredModal />
            ))}
        </main>
      ) : (
        <NotConnected />
      )}
    </ClientLayout>
  );
};

export default Layout;
