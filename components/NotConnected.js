import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from "wagmi";
import { DangerButton, StartActivityButton } from "./Buttons/Buttons";
import { ModalTitle, Paragraph } from "./Texts";

const NotConnected = () => {
  const [wallet, setWallet] = useState(false);
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork({ chainId: 5 });
  const { connect, connectors, isLoading: connectorLoading } = useConnect();

  useEffect(() => {
    if (window.ethereum !== undefined) setWallet(true);
  }, []);

  return (
    <div className="h-screen bg-slate-800 flex flex-col justify-center items-center">
      <div className="row justify-content-center align-items-center">
        <ModalTitle>Connect Your Wallet</ModalTitle>
      </div>
      <div className="flex justify-center items-center w-full">
        {!wallet ? (
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
      {!wallet && (
        <div className="m-2 w-2/6 text-center ">
          <Paragraph>
            You don't have metamask installed in your browser. install metamask
            first so you can try the app :)
          </Paragraph>
        </div>
      )}
    </div>
  );
};

export default NotConnected;
