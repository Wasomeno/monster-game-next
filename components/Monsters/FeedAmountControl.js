import React from "react";

const FeedAmountControl = ({ amount, setAmount }) => {
  function decrement() {
    if (amount <= 1) return;
    setAmount(amount - 1);
  }
  function increment() {
    if (amount >= 10) return;
    setAmount(amount + 1);
  }
  return (
    <div className="flex justify-center items-center">
      <button className="bg-slate-50 h-8 w-8 rounded" onClick={decrement}>
        -
      </button>
      <input
        type="text"
        className="w-3/6 h-8 mx-1 text-center rounded font-monogram"
        value={amount}
      />
      <button className="bg-slate-50 h-8 w-8 rounded" onClick={increment}>
        +
      </button>
    </div>
  );
};

export default FeedAmountControl;
