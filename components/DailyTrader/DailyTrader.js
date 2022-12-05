import useTrades from "../../fetchers/useTrades";
import { ModalTitle, Paragraph } from "../Texts";
import TradeDetails from "./TradeDetails";
import MoonLoader from "react-spinners/MoonLoader";

const DailyTrader = () => {
  const trades = useTrades();
  return (
    <>
      <div className="flex justify-center">
        <ModalTitle>Daily Trader</ModalTitle>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        {trades.isLoading ? (
          <MoonLoader loading={trades.isLoading} size={30} color="white" />
        ) : (
          trades.data?.map((trade, index) => (
            <div className="flex w-full items-center justify-around">
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

export default DailyTrader;
