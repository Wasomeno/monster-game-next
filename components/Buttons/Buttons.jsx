import Image from "next/image";
import MoonLoader from "react-spinners/MoonLoader";
import LoadingSpinner from "../LoadingSpinner";
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
        " font-monogram m-2 flex justify-center rounded-md bg-green-700 p-2 text-xl tracking-wide text-white transition duration-300 ease-in-out hover:bg-slate-50 hover:text-black disabled:bg-opacity-30 disabled:text-opacity-30"
      }
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export const DangerButton = ({ text, onClick, condition, loading }) => {
  return (
    <button
      disabled={condition}
      className="font-monogram m-2 flex w-3/12 justify-center rounded-md bg-red-700 p-2 text-xl tracking-wide text-white transition duration-300 ease-in-out hover:bg-slate-50 hover:text-black disabled:bg-opacity-30 disabled:text-opacity-30"
      onClick={onClick}
    >
      {loading ? <LoadingSpinner /> : text}
    </button>
  );
};

export const BackButton = ({ onClick }) => {
  return (
    <button className="absolute left-5 p-3" onClick={onClick}>
      <Image
        src="/icons/back_icon.png"
        width={"40"}
        height={"30"}
        alt="back-img"
      />
    </button>
  );
};
