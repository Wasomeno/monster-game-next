import React from "react";

import { Paragraph } from "@/components/Texts";

const BuyAmountControl = ({ amount, setAmount, limit }) => {
  const increment = () => {
    if (amount >= limit) return;
    setAmount((currentQuantity) => currentQuantity + 1);
  };

  const decrement = () => {
    if (amount <= 1) return;
    setAmount((currentQuantity) => currentQuantity - 1);
  };
  return (
    <div className={"flex w-8/12 items-center justify-around"}>
      <button
        className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-50 p-2 text-lg"
        onClick={decrement}
      >
        -
      </button>
      <Paragraph>{amount}</Paragraph>
      <button
        className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-50 p-2 text-lg"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
};

export default BuyAmountControl;
