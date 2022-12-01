import useTrades from "../../fetchers/useTrades";
import { ModalTitle } from "../Texts";
import TradeDetails from "./TradeDetails";

const DailyTrader = () => {
  const trades = useTrades();
  return (
    <>
      <div className="flex justify-center">
        <ModalTitle>Daily Trader</ModalTitle>
      </div>
      <div className="">
        {trades.data?.map((trade, index) => (
          <TradeDetails
            key={index}
            details={{ id: index, tradeDetails: trade }}
          />
        ))}
      </div>
    </>
  );
};

export default DailyTrader;
