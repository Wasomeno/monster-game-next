import React, { useEffect } from "react";
import { motion } from "framer-motion";

const MissionFinishedModal = ({ rewards, show, toggleShow }) => {
  function intoString(string) {
    return string.toString();
  }

  useEffect(() => {}, [rewards]);

  if (!show) return;
  return (
    <>
      <motion.div
        id="rewards-modal-screen"
        className="h-100 w-100 bg-dark bg-opacity-75"
        onClick={toggleShow}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      />
      <motion.div
        id="rewards-modal"
        className="container w-75 h-75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      >
        <div className="row justify-content-center align-items-center">
          <div className="col-6 my-2">
            <h4 id="modal-title" className="text-center">
              Mission Rewards
            </h4>
          </div>
        </div>

        <div className="row justify-content-center align-items-center">
          <div className="col-10 d-flex justify-content-center align-items-center flex-wrap">
            {rewards.map((reward, index) => (
              <div key={index} className="border border-2 border-dark col-4">
                <h5 id="text" className="text-white">
                  {intoString(reward._monster)}
                </h5>
                <h5 id="text" className="text-white">
                  {intoString(reward._items)}
                </h5>
                <h5 id="text" className="text-white">
                  {intoString(reward._quantities)}
                </h5>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MissionFinishedModal;
