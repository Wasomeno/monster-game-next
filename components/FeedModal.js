import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { itemsContract, monsterGameContract } from "../hooks/useContract";
import { ethers } from "ethers";
import AppContext from "../contexts/AppContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPotion } from "../fetchers/fetchers";
import { energyPotion, feed } from "../mutations/mutations";

const FeedModal = ({ showFeed, setShowFeed, monster }) => {
  const [amount, setAmount] = useState(1);
  const getPotions = useQuery(["potions"], getPotion());
  const feedMonster = useMutation(() => feed(monster, amount));
  const useEnergyPotion = useMutation(() => energyPotion(monster));

  function decrement() {
    if (amount <= 1) return;
    setAmount(amount - 1);
  }
  function increment() {
    if (amount >= 10) return;
    setAmount(amount + 1);
  }

  if (!showFeed) return;
  return (
    <>
      <motion.div
        id="modal-screen"
        className="h-100 w-100 bg-dark bg-opacity-75"
        onClick={() => setShowFeed(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      />
      <motion.div
        id="shop-modal"
        className="container w-50 h-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      >
        <div className="row justify-content-center align-items-center">
          <h3 className="text-center p-2 text-white" id="modal-title">
            Feed Monsters
          </h3>
        </div>
        <div className="row justify-content-center align-items-center">
          <div className="col text-center">
            <h4 className="m-0 p-1 text-white" id="text">
              Pay to Feed
            </h4>
            <div className="d-flex justify-content-center align-items-center">
              <button className="btn btn-danger" onClick={decrement}>
                -
              </button>
              <input
                type="text"
                className="form-control w-25 mx-1 text-center"
                value={amount}
                id="text"
              />
              <button className="btn btn-success" onClick={increment}>
                +
              </button>
            </div>
            <button
              className="btn btn-success my-2"
              id="text"
              onClick={() => feedMonster.mutate()}
            >
              Feed
            </button>
          </div>
          <div className="col text-center">
            <h4 className="m-0 p-1 text-white" id="text">
              Use Potion
            </h4>
            <div className="d-flex justify-content-center align-items-center">
              <img src="/2.png" width={"20%"} alt="potion-img" />
              <h5 className="m-0 p-1" id="modal-title">
                x {getPotions.data?.toString()}
              </h5>
            </div>
            <button
              className="btn btn-success"
              id="text"
              onClick={() => useEnergyPotion.mutate()}
            >
              Use Potion
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FeedModal;
