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
    <div className="m-2 flex justify-center">
      <button
        className="font-monogram w-12 rounded-md bg-slate-50 p-1 text-lg"
        onClick={() => decrement()}
      >
        -
      </button>
      <input
        type="text"
        readOnly={true}
        className="w-25 font-monogram mx-2 rounded-md p-1 text-center text-lg"
        value={amount}
      />
      <button
        className="font-monogram w-12 rounded-md bg-slate-50 p-1 text-lg"
        onClick={() => increment()}
      >
        +
      </button>
    </div>
  );
};

export default SummonAmountControl;
