import React from "react";

const StatsBar = ({ value, maxValue }) => {
  const barLength = Math.floor(maxValue / value);
  const length = Math.floor(12 / barLength);
  console.log(length);
  const lengthClass =
    length !== 0 && length !== 12
      ? "w-" + length + "/12"
      : length === 12
      ? "w-full"
      : "w-0";
  return (
    <div className="w-6/12 flex items-center justify-center p-0 relative overflow-hidden h-5 rounded-full bg-slate-700 border border-gray-300">
      <p className="relative z-10 text-white font-monogram tracking-wide">
        {value} / {maxValue}
      </p>
      <div
        className={
          "absolute top-0 left-0 text-center bg-red-900 h-5 -z-0 " + lengthClass
        }
      />
    </div>
  );
};

export default StatsBar;
