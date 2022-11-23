import Image from "next/image";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import TradeAmountControl from "./TradeAmountControl";
import { items } from "./itemsMap";
import { Paragraph } from "../Texts";
import { tradeSides } from "../../mutations/sideffects";
import {
  tradeItemApproved,
  tradeItemNotApproved,
} from "../../mutations/mutations";

const TradeDetails = ({ details, approval, user }) => {
  const { id, trade } = details;
  const [quantity, setQuantity] = useState(1);
  const tradeMutation = useMutation(
    () =>
      approval
        ? tradeItemApproved(id, quantity, user)
        : tradeItemNotApproved(id, quantity, user),
    tradeSides()
  );

  return (
    <div className="flex justify-evenly items-center w-full h-18">
      <div className="flex flex-col justify-evenly items-center">
        <div>
          <Image
            width={40}
            height={40}
            src={items.get(trade.itemReceived).image}
          />
        </div>
        <div>
          <Paragraph>
            {items.get(trade.itemReceived).name} x{trade.quantityReceived}
          </Paragraph>
        </div>
      </div>
      <div className="flex flex-col justify-evenly items-center">
        <div>
          <Image
            width={40}
            height={40}
            src={items.get(trade.itemTrade).image}
          />
        </div>
        <div>
          <Paragraph>
            {items.get(trade.itemTrade).name} x{trade.quantityTrade}
          </Paragraph>
        </div>
      </div>
      <TradeAmountControl
        amount={quantity}
        setAmount={setQuantity}
        limit={trade.limit}
      />
      <button
        className="font-monogram p-1 w-1/12 rounded-md bg-slate-50 text-lg"
        onClick={() => tradeMutation.mutate()}
      >
        Trade
      </button>
    </div>
  );
};

export default TradeDetails;
