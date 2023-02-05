import React from "react";

const TradeAmountControl = ({ amount, setAmount, limit }) => {
  const increment = () => {
    if (amount >= limit) return;
    setAmount((currentQuantity) => currentQuantity + 1);
  };

  const decrement = () => {
    if (amount <= 1) return;
    setAmount((currentQuantity) => currentQuantity - 1);
  };
  return (
    <div className={"flex justify-around items-center w-2/12"}>
      <h5 className="m-0 font-monogram text-white text-xl" onClick={decrement}>
        -
      </h5>
      <h4 className="font-monogram text-white text-xl m-0">{amount}</h4>
      <h5 className="font-monogram text-white text-xl" onClick={increment}>
        +
      </h5>
    </div>
  );
};

export default TradeAmountControl;
