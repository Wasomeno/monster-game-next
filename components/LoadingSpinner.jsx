import React from "react";

const spinnerSizes = {
  small: "w-10 h-10",
  medium: "w-24 h-24",
  large: "w-36 h-36",
};

const LoadingSpinner = ({ size = "small" }) => {
  return (
    <div
      class={
        spinnerSizes[size] +
        " animate-spin rounded-full border-4 border-solid border-slate-400 border-t-transparent"
      }
    />
  );
};

export default LoadingSpinner;
