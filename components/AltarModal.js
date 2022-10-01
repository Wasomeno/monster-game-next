import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { monsterContract } from "../hooks/useContract";
import AppContext from "./AppContext";
import useProvider from "../hooks/useProvider";
import { ethers } from "ethers";

const AltarModal = ({ showAltar, toggleShowAltar }) => {
  const [quantity, setQuantity] = useState(1);
  const provider = useProvider();
  const toast = useContext(AppContext).toast;
  const loading = useContext(AppContext).loading;
  const monsterHandler = monsterContract();

  const increment = () => {
    if (quantity >= 5) return;
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  async function summonMonster() {
    const price = await monsterHandler.SUMMON_PRICE();
    const formattedPrice = ethers.utils.formatEther(price);
    const totalCost = formattedPrice * quantity;
    try {
      await monsterHandler
        .summon(quantity, {
          value: ethers.utils.parseEther(totalCost.toString()),
        })
        .then((response) => {
          loading.setLoadingText("Summoning your Monsters...");
          loading.toggleLoading();
          provider.waitForTransaction(response.hash).then(() => {
            loading.toggleLoading();
            toast.success("Summon Success");
          });
          setQuantity(1);
        });
    } catch (error) {
      toast.error(error.reason);
    }
  }
  if (!showAltar) return;
  return (
    <>
      <motion.div
        id="modal-screen"
        className="h-100 w-100 bg-dark bg-opacity-75"
        onClick={toggleShowAltar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      />
      <motion.div
        id="shop-modal"
        className="container w-75 h-75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        <img
          src="/back_icon.png"
          onClick={toggleShowAltar}
          width={"45px"}
          alt="back-img"
        />
        <div className="row justify-content-center">
          <h2 id="modal-title" className="text-center m-0 p-0">
            Summoning Altar
          </h2>
        </div>
        <div className="row justify-content-center align-items-center">
          <div className="col-6">
            <img src="/summoning-altar.png" alt="altar-icon" width={"100%"} />
          </div>
        </div>
        <div className="d-flex justify-content-center m-2">
          <button className="btn btn-danger" onClick={() => decrement()}>
            {" "}
            -{" "}
          </button>
          <input
            type="text"
            className="form-control w-25 mx-2 text-center"
            value={quantity}
          />
          <button className="btn btn-success" onClick={() => increment()}>
            {" "}
            +{" "}
          </button>
        </div>
        <div className="row justify-content-center">
          <button className="btn btn-primary m-2 w-25" onClick={summonMonster}>
            <h5 id="text" className="text-white m-0">
              Summon
            </h5>
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default AltarModal;
