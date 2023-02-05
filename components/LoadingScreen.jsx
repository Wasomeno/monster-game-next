import React from "react";
import { motion } from "framer-motion";
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
        className="h-72 w-72 flex flex-col gap-2 justify-center rounded-md bg-slate-600 p-2 absolute z-40 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      >
        <div className="text-center">
          <h5 className="text-white m-3 font-monogram text-3xl tracking-wide">
            {loadingText}
          </h5>
        </div>
        <div className="flex justify-center">
          <div class="border-t-transparent border-solid animate-spin  rounded-full border-slate-400 border-4 h-12 w-12" />
        </div>
        <div className="text-center p-2">
          <p className="font-monogram text-xl text-white">
            Confirm the transaction in your wallet
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default LoadingScreen;
