import Image from "next/image";
import React, { useState } from "react";
import TradeAmountControl from "./TradeAmountControl";
import { items } from "./itemsMap";
import { Paragraph } from "../Texts";
import tradeItem from "../../lib/mutations/DailyTrader/tradeItem";
import { StartActivityButton } from "../Buttons/Buttons";
import useUserDailyTradeLimit from "../../lib/queries/DailyTrader/useUserDailyTradeLimit";

const TradeDetails = ({ details }) => {
  const { id, tradeDetails } = details;
  const [quantity, setQuantity] = useState(1);
  const { data: dailyLimit, isLoading } = useUserDailyTradeLimit();
  const trade = tradeItem({ id: id, quantity: quantity });

  return (
    <div className="flex justify-evenly items-center w-10/12 h-18">
      <div className="flex flex-col justify-evenly items-center">
        <div>
          <Image
            width={40}
            height={40}
            src={items.get(tradeDetails.itemReceived).image}
          />
        </div>
        <div>
          <Paragraph>
            {items.get(tradeDetails.itemReceived).name} x
            {tradeDetails.quantityReceived}
          </Paragraph>
        </div>
      </div>
      <div className="flex flex-col justify-evenly items-center">
        <div>
          <Image
            width={40}
            height={40}
            src={items.get(tradeDetails.itemTrade).image}
          />
        </div>
        <div>
          <Paragraph>
            {items.get(tradeDetails.itemTrade).name} x
            {tradeDetails.quantityTrade}
          </Paragraph>
        </div>
      </div>
      <TradeAmountControl
        amount={quantity}
        setAmount={setQuantity}
        limit={tradeDetails.limit}
      />
      <StartActivityButton
        text="Trade"
        onClick={() => trade()}
        condition={parseInt(dailyLimit) === tradeDetails.limit}
        loading={isLoading}
      />
    </div>
  );
};

export default TradeDetails;
