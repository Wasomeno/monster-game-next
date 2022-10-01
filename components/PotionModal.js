import React, { useContext, useEffect, useState } from "react";
import { itemsContract, monsterGameContract } from "../hooks/useContract";
import AppContext from "./AppContext";
import { motion } from "framer-motion";
import useProvider from "../hooks/useProvider";

const PotionModal = ({ showPotions, setShowPotions, monster }) => {
  const user = useContext(AppContext).account[0];
  const [amount, setAmount] = useState(1);
  const [potion, setPotion] = useState(0);
  const toast = useContext(AppContext).toast;
  const loading = useContext(AppContext).loading;
  const provider = useProvider();
  const itemsHelper = itemsContract();
  const monsterGameHelper = monsterGameContract();

  async function getPotion() {
    await itemsHelper.balanceOf(user, 2).then((response) => {
      setPotion(response);
    });
  }

  async function useEnergyPotion() {
    const isApproved = await itemsHelper.isApprovedForAll(
      user,
      monsterGameHelper.address
    );
    if (!isApproved) {
      try {
        await itemsHelper.setApprovalAll(monsterGameHelper.address, true);
        await monsterGameHelper
          .useEnergyPotion(monster, amount)
          .then((response) => {
            loading.setLoadingText(
              "Monster #" + monster + " Consuming potion..."
            );
            loading.toggleLoading();
            provider.waitForTransaction(response.hash).then(() => {
              loading.toggleLoading();
              getPotion();
            });
          });
      } catch (error) {
        toast.error(error.reason);
      }
    } else {
      try {
        await monsterGameHelper
          .useEnergyPotion(monster, amount)
          .then((response) => {
            loading.setLoadingText(
              "Monster #" + monster + " Consuming potion..."
            );
            loading.toggleLoading();
            provider.waitForTransaction(response.hash).then(() => {
              loading.toggleLoading();
              getPotion();
            });
          });
      } catch (error) {
        toast.error(error.reason);
      }
    }
  }

  function decrement() {
    if (amount <= 1) return;
    setAmount(amount - 1);
  }
  function increment() {
    if (amount >= 10) return;
    setAmount(amount + 1);
  }

  useEffect(() => {
    getPotion();
  }, [potion]);

  if (!showPotions) return;
  return (
    <>
      <motion.div
        id="modal-screen"
        className="h-100 w-100 bg-dark bg-opacity-75"
        onClick={() => setShowPotions(false)}
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
          <h3 className="text-center p-2" id="text">
            Use Potions
          </h3>
        </div>
        <div className="row justify-content-center align-items-center">
          <div className="col text-center">
            <div className="d-flex justify-content-center align-items-center">
              <img src="/2.png" width={"20%"} alt="potion-img" />
              <h5 className="m-0 p-1" id="modal-title">
                x {potion.toString()}
              </h5>
            </div>
            <button
              className="btn btn-success"
              id="text"
              onClick={useEnergyPotion}
            >
              Use Potion
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PotionModal;
