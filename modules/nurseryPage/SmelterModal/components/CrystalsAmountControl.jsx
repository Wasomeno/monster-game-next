import { Paragraph } from "@/components/Texts";

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
    <div className="my-2 flex w-4/6 items-center justify-center">
      <button
        onClick={() => decrement()}
        className="font-monogram flex h-8 w-8 items-center justify-center rounded bg-slate-50 p-1 text-xl"
      >
        {"<"}
      </button>
      <div className="flex w-3/6 items-center justify-center">
        <Paragraph>
          {amount} / {parseInt(maxAmount)}
        </Paragraph>
      </div>

      <button
        onClick={() => increment()}
        className="font-monogram flex h-8 w-8 items-center justify-center rounded bg-slate-50 p-1 text-xl"
      >
        {">"}
      </button>
    </div>
  );
};

export default CrystalsAmountControl;
