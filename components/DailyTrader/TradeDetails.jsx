import Image from "next/image";
import React, { useState } from "react";
import TradeAmountControl from "./TradeAmountControl";
import { items } from "./itemsMap";
import { Paragraph } from "../Texts";
import { useTrade } from "../../mutations/traderMutations";

const TradeDetails = ({ details }) => {
  const { id, tradeDetails } = details;
  const [quantity, setQuantity] = useState(1);
  const trade = useTrade({ id: id, quantity: quantity });
  return (
    <div className="flex justify-evenly items-center w-full h-18">
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
      <button
        className="font-monogram p-1 w-1/12 rounded-md bg-slate-50 text-lg"
        onClick={() => trade()}
      >
        Trade
      </button>
    </div>
  );
};

export default TradeDetails;
