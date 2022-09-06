import React, { useState } from "react";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import MonsterABI from "../abi/Monsters.json";

const MonsterContract = "0x90B9aCC7C0601224310f3aFCaa451c0D545a1b41";

const AltarModal = ({ showAltar, setShowAltar }) => {
  const [quantity, setQuantity] = useState(1);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const monsterContract = new ethers.Contract(
    MonsterContract,
    MonsterABI.abi,
    signer
  );

  const increment = () => {
    if (quantity >= 5) return;
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  async function summonMonster() {
    const price = await monsterContract.price();
    await monsterContract
      .summon(quantity, { value: price * quantity })
      .then((response) => {
        setQuantity(1);
      });
  }
  if (!showAltar) return;
  return (
    <>
      <motion.div
        id="modal-screen"
        className="h-100 w-100 bg-dark bg-opacity-75"
        onClick={() => setShowAltar(false)}
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
          onClick={() => setShowAltar(false)}
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
          <button className="btn btn-warning m-2 w-25" onClick={summonMonster}>
            Summon
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default AltarModal;
