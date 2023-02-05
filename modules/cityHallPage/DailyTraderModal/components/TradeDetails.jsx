import Image from "next/image";
import React, { useState } from "react";

import { StartActivityButton } from "@/components/Buttons/Buttons";
import tradeItem from "@/components/reactQuery/mutations/tradeItem";
import useUserDailyTradeLimit from "@/components/reactQuery/queries/useUserDailyTradeLimit";
import { Paragraph } from "@/components/Texts";

import { items } from "./itemsMap";
import TradeAmountControl from "./TradeAmountControl";

const TradeDetails = ({ details }) => {
  const { id, tradeDetails } = details;
  const [quantity, setQuantity] = useState(1);
  const { data: dailyLimit, isLoading } = useUserDailyTradeLimit();
  const trade = tradeItem({ id: id, quantity: quantity });

  return (
    <div className="h-18 flex w-10/12 items-center justify-evenly">
      <div className="flex flex-col items-center justify-evenly">
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
      <div className="flex flex-col items-center justify-evenly">
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
