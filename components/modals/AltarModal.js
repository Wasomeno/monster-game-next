import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { summonMonster } from "../../mutations/mutations";
import { useLoading, useToast } from "../../stores/stores";
import { altarModalStores } from "../../stores/modalStores";
import { summoningSides } from "../../mutations/sideffects";
import BackButton from "../buttons/BackButton";
import AppContext from "../../contexts/AppContext";

const AltarModal = () => {
  const user = useContext(AppContext).account[0];
  const [show, toggleShow] = altarModalStores((state) => [
    state.show,
    state.toggleShow,
  ]);
  const [quantity, setQuantity] = useState(1);
  const summonMutation = useMutation(
    () => summonMonster(quantity),
    summoningSides(user)
  );

  const increment = () => {
    if (quantity >= 5) return;
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            id="modal-screen"
            className="h-100 w-100 bg-dark bg-opacity-75"
            onClick={toggleShow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0 }}
          />
          <motion.div
            id="shop-modal"
            className="container w-75 h-75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "tween",
              duration: 0.25,
              ease: "easeInOut",
            }}
          >
            <BackButton onClick={toggleShow} />
            <div className="row justify-content-center">
              <h2 id="modal-title" className="text-center m-0 p-0">
                Summoning Altar
              </h2>
            </div>
            <div className="row justify-content-center align-items-center">
              <div className="col-6">
                <img
                  src="/ui/summoning-altar.png"
                  alt="altar-icon"
                  width={"100%"}
                />
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
              <button
                className="btn btn-primary m-2 w-25"
                onClick={() => summonMutation.mutate()}
              >
                <h5 id="text" className="text-white m-0">
                  Summon
                </h5>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AltarModal;
