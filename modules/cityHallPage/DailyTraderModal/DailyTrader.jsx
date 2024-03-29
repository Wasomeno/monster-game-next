import MoonLoader from "react-spinners/MoonLoader";

import useDailyTrades from "@/components/reactQuery/queries/useDailyTrades";
import { ModalTitle, Paragraph } from "@/components/Texts";

import TradeDetails from "./components/TradeDetails";

export const DailyTrader = () => {
  const trades = useDailyTrades();
  return (
    <>
      <div className="flex justify-center">
        <ModalTitle>Daily Trader</ModalTitle>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        {trades.isLoading ? (
          <MoonLoader loading={trades.isLoading} size={30} color="white" />
        ) : (
          trades.data?.map((trade, index) => (
            <div
              key={index}
              className="flex w-full items-center justify-around"
            >
              <div className="w-1/12 text-center">
                <Paragraph>{index + 1}.</Paragraph>
              </div>
              <TradeDetails
                key={index}
                details={{ id: index, tradeDetails: trade }}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};
