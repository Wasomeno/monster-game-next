import React from "react";
import { motion } from "framer-motion";
import MoonLoader from "react-spinners/MoonLoader";
import { useLoadingDetails } from "../stores/stores";

const LoadingScreen = () => {
  const [loading, loadingText] = useLoadingDetails();
  if (!loading) return;
  return (
    <>
      <motion.div
        className="h-screen w-screen bg-slate-800 bg-opacity-75 absolute z-30 top-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      />
      <motion.div
        className="h-60 w-60 flex flex-col justify-center rounded-md bg-slate-600 p-2 absolute z-40 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      >
        <div className="flex justify-center items-center">
          <h5 className="text-center text-white m-3 font-monogram text-3xl tracking-wide">
            {loadingText}
          </h5>
        </div>
        <div className="flex justify-center">
          <MoonLoader size={50} loading={loading} color={"#fff"} />
        </div>
      </motion.div>
    </>
  );
};

export default LoadingScreen;
