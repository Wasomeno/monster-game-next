import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MoonLoader from "react-spinners/MoonLoader";
import useToggle from "../hooks/useToggle";

export const LoadingScreen = ({ text, loading }) => {
  useEffect(() => {
    // console.log(text, loading);
  }, [loading]);

  if (!loading) return;
  return (
    <>
      <motion.div
        id="loading-modal-screen"
        className="h-100 w-100 bg-dark bg-opacity-75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      />
      <motion.div
        id="loading-modal"
        className="container w-25 h-25"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      >
        <div className="row justify-content-center align-items-center">
          <h3 id="modal-title" className="text-center m-3">
            {text}
          </h3>
        </div>
        <div className="d-flex justify-content-center">
          <MoonLoader size={50} loading={loading} color={"#EEEEEE"} />
        </div>
      </motion.div>
    </>
  );
};

export const setLoading = () => {
  const [loading, toggleLoading] = useToggle(false);
  const [text, setText] = useState(false);

  const setLoadingText = (string) => {
    setText(string);
  };

  const loadingModal = () => [LoadingScreen({ text, loading })];

  return [setLoadingText, toggleLoading, loadingModal];
};
