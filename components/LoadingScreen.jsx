import React from "react";
import { motion } from "framer-motion";
import { useLoadingDetails } from "../stores/stores";
import LoadingSpinner from "./LoadingSpinner";

const LoadingScreen = () => {
  const [loading, loadingText] = useLoadingDetails();
  if (!loading) return;
  return (
    <>
      <motion.div
        className="absolute top-0 z-30 h-screen w-screen bg-slate-800 bg-opacity-75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 z-40 flex h-72 w-72 -translate-x-1/2 -translate-y-1/2 flex-col justify-center gap-2 rounded-md bg-slate-600 p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      >
        <div className="text-center">
          <h5 className="font-monogram m-3 text-3xl tracking-wide text-white">
            {loadingText}
          </h5>
        </div>
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
        <div className="p-2 text-center">
          <p className="font-monogram text-xl text-white">
            Confirm the transaction in your wallet
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default LoadingScreen;
