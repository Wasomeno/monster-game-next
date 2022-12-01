import React from "react";
import { Paragraph } from "../Texts";

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
    <div className={"flex justify-around items-center w-8/12"}>
      <button
        className="p-2 text-lg bg-slate-50 rounded-md w-6 h-6 flex items-center justify-center"
        onClick={decrement}
      >
        -
      </button>
      <Paragraph>{amount}</Paragraph>
      <button
        className="p-2 text-lg bg-slate-50 rounded-md w-6 h-6 flex items-center justify-center"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
};

export default BuyAmountControl;
