import React from "react";
import { Paragraph } from "../Texts";

const CrystalsAmountControl = ({ amount, maxAmount, setAmount }) => {
  const increment = () => {
    if (amount >= maxAmount) return;
    setAmount((currentAmount) => currentAmount + 1);
  };
  const decrement = () => {
    if (amount <= 1) return;
    setAmount((currentAmount) => currentAmount - 1);
  };

  return (
    <div className="w-4/6 flex justify-center items-center my-2">
      <button
        onClick={() => decrement()}
        className="bg-slate-50 p-1 w-8 h-8 rounded font-monogram text-xl flex justify-center items-center"
      >
        {"<"}
      </button>
      <div className="flex justify-center items-center w-3/6">
        <Paragraph>
          {amount} / {parseInt(maxAmount)}
        </Paragraph>
      </div>

      <button
        onClick={() => increment()}
        className="bg-slate-50 p-1 w-8 h-8 rounded font-monogram text-xl flex justify-center items-center"
      >
        {">"}
      </button>
    </div>
  );
};

export default CrystalsAmountControl;
