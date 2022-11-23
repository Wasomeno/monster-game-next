import React from "react";

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
    <div className={"flex justify-around items-center w-6/12"}>
      <h5 id="text" className="m-0" onClick={decrement}>
        -
      </h5>
      <h4 id="text" className="text-white m-0">
        {amount}
      </h4>
      <h5 id="text" className="m-0" onClick={increment}>
        +
      </h5>
    </div>
  );
};

export default BuyAmountControl;
