import React from "react";

const SummonAmountControl = ({ amount, setAmount }) => {
  const increment = () => {
    if (amount >= 5) return;
    setAmount((currentAmount) => currentAmount + 1);
  };

  const decrement = () => {
    if (amount <= 1) return;
    setAmount((currentAmount) => currentAmount - 1);
  };
  return (
    <div className="flex justify-center m-2">
      <button
        className="bg-slate-50 w-12 font-monogram text-lg p-1 rounded-md"
        onClick={() => decrement()}
      >
        -
      </button>
      <input
        type="text"
        readOnly={true}
        className="w-25 mx-2 text-center font-monogram text-lg p-1 rounded-md"
        value={amount}
      />
      <button
        className="bg-slate-50 w-12 font-monogram text-lg p-1 rounded-md"
        onClick={() => increment()}
      >
        +
      </button>
    </div>
  );
};

export default SummonAmountControl;
