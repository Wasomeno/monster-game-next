import MoonLoader from "react-spinners/MoonLoader";
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from "wagmi";

import { useWallet } from "../hooks/useWallet";
import { DangerButton, StartActivityButton } from "./Buttons/Buttons";
import { ModalTitle, Paragraph } from "./Texts";

const NotConnected = () => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork({ chainId: 5 });
  const { connect, connectors, isLoading: connectorLoading } = useConnect();
  const { isInstalled, isLoading: isScanning } = useWallet();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-800">
      {isScanning ? (
        <p>Scanning For wallets</p>
      ) : (
        <>
          <div className="p-2 text-center">
            <ModalTitle>Connect Your Wallet</ModalTitle>
          </div>
          <div className="flex w-full items-center justify-center">
            {!isInstalled ? (
              <DangerButton
                text="Install Metamask"
                onClick={() =>
                  window.open(
                    "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                  )
                }
              />
            ) : !isConnected ? (
              connectors.map((connector, index) => (
                <StartActivityButton
                  key={index}
                  text="Connect"
                  onClick={() => connect({ connector: connector })}
                />
              ))
            ) : (
              chain?.id !== 5 && (
                <DangerButton
                  text="Switch Network"
                  onClick={() => switchNetwork?.()}
                />
              )
            )}
          </div>
          {isConnected && chain?.id !== 5 && (
            <div className="w-50 my-4 flex items-center justify-center">
              <Paragraph>You're Connected to the Wrong Network</Paragraph>
            </div>
          )}
          {connectorLoading && (
            <div className="m-2 flex w-4/6 items-center justify-center gap-4">
              <MoonLoader loading={connectorLoading} size="25" color="white" />
              <Paragraph>Connecting Wallet</Paragraph>
            </div>
          )}
          {!isInstalled && !isScanning && (
            <div className="m-2 w-2/6 text-center ">
              <Paragraph>
                You don't have metamask installed in your browser. install
                metamask first so you can try the app :)
              </Paragraph>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NotConnected;
