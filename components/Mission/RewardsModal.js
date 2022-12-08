import React, { useState } from "react";
import { motion } from "framer-motion";
import useToggle from "../../hooks/useToggle";

export const RewardsModal = () => {
  const [show, rewards, toggleShow] = rewardsModalStores((state) => [
    state.show,
    state.rewards,
    state.toggleShow,
  ]);
  function intoString(string) {
    return string.toString();
  }

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
              Your Rewards
            </h4>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center flex-wrap">
          {rewards.map((reward, index) => (
            <div
              key={index}
              className="border border-2 border-dark rounded m-2 col-4 d-flex justify-content-evenly align-items-center"
              style={{ height: "10rem" }}
            >
              <div className="col-4 justify-content-center p-2">
                <img
                  src={"/monsters/" + (parseInt(reward._monster) + 1) + ".png"}
                  width={"75%"}
                  height={"50%"}
                  alt="monster-img"
                />
              </div>
              <div className="col">
                <h4 id="text" className="text-white text-center p-2 m-1">
                  Monster #{intoString(reward._monster)}
                </h4>
                <div className="d-flex justify-content-around align-items-center">
                  {reward._items.map((item, index) => (
                    <div key={index} className="">
                      <img src={intoString(item) + ".png"} width="30px" />
                      <h5 id="text" className="text-white text-center">
                        x {intoString(reward._amount[index])}
                      </h5>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="col-4" />
        </div>
      </motion.div>
    </>
  );
};

export const setRewardModal = () => {
  const [rewards, setRewards] = useState([]);
  const [show, toggleShow] = useToggle(false);
  const rewardModal = () => RewardsModal({ rewards, show, toggleShow });

  return [setRewards, toggleShow, rewardModal];
};
