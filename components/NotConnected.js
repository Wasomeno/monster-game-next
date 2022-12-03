import { useEffect } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from "wagmi";
import { useToast } from "../stores/stores";
import { DangerButton, StartActivityButton } from "./Buttons/Buttons";
import { Paragraph } from "./Texts";

const NotConnected = () => {
  const [toastSuccess] = useToast();
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork({ chainId: 5 });
  const {
    connect,
    connectors,
    isLoading: connectorLoading,
    isSuccess: walletConnected,
  } = useConnect();
  return (
    <div className="h-screen bg-slate-800 flex flex-col justify-center items-center">
      <div className="row justify-content-center align-items-center">
        <h1 className="p-2 text-white font-monogram text-2xl tracking-wide">
          Connect Your Wallet
        </h1>
      </div>
      <div className="flex justify-center items-center w-full">
        {!isConnected
          ? connectors.map((connector) => (
              <StartActivityButton
                text="Connect"
                onClick={() => connect({ connector: connector })}
              />
            ))
          : chain?.id !== 5 && (
              <DangerButton
                text="Switch Network"
                onClick={() => switchNetwork?.()}
              />
            )}
      </div>
      {isConnected && chain?.id !== 5 && (
        <div className="flex justify-center items-center w-50 my-4">
          <Paragraph>You're Connected to the Wrong Network</Paragraph>
        </div>
      )}
      {connectorLoading && (
        <div className="m-2 w-4/6 flex justify-center items-center gap-4">
          <MoonLoader loading={connectorLoading} size="25" color="white" />
          <Paragraph>Connecting Wallet</Paragraph>
        </div>
      )}
    </div>
  );
};

export default NotConnected;
