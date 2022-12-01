import Image from "next/image";

const sizeClasses = {
  default: "w-3/12",
  medium: "w-6/12",
  large: "w-9/12",
};

export const StartActivityButton = ({ text, onClick, condition, size }) => {
  return (
    <button
      disabled={condition}
      className={
        (!size ? sizeClasses["default"] : sizeClasses[size]) +
        " bg-green-700 rounded-md tracking-wide p-2 m-2 font-monogram transition ease-in-out duration-300 text-white text-xl hover:bg-slate-50 hover:text-black disabled:bg-opacity-30 disabled:text-opacity-30"
      }
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export const DangerButton = ({ text, onClick, condition }) => {
  return (
    <button
      disabled={!condition}
      className="bg-red-700 rounded-md tracking-wide p-2 w-3/12 m-2 font-monogram transition ease-in-out duration-300 text-white text-xl hover:bg-slate-50 hover:text-black disabled:bg-opacity-30 disabled:text-opacity-30"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export const BackButton = ({ onClick }) => {
  return (
    <button className="p-3 absolute left-5" onClick={onClick}>
      <Image
        src="/icons/back_icon.png"
        width={"40px"}
        height={"30px"}
        alt="back-img"
      />
    </button>
  );
};
