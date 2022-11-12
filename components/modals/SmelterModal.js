import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AppContext from "../../contexts/AppContext";
import TimeButton from "../TimeButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getApprovalStatus,
  getCrystals,
  getCrystalsInSmelter,
} from "../../fetchers/fetchers";
import {
  finishSmelt,
  smelt,
  smeltNotApproved,
} from "../../mutations/mutations";
import { smelterModalStores } from "../../stores/modalStores";

const SmelterModal = () => {
  const user = useContext(AppContext).account[0];
  const [show, toggleShow] = smelterModalStores((state) => [
    state.show,
    state.toggleShow,
  ]);
  const approvalStatus = useQuery(
    ["approvalStatus", process.env.SMELTER_CONTRACT_ADDRESS],
    getApprovalStatus(user, process.env.SMELTER_CONTRACT_ADDRESS)
  );
  const crytalsInInventory = useQuery(
    ["crystalsInInventory", user],
    getCrystals(user)
  );
  const crystalsInSmelter = useQuery(
    ["cyrstalsInSmelter", user],
    getCrystalsInSmelter(user)
  );
  const startSmelt = useMutation(() =>
    approvalStatus.data ? smelt(crystals) : smeltNotApproved(crystals)
  );
  const finishSmelting = useMutation(() => finishSmelt());
  const [crystals, setCrystals] = useState(0);

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
            transition={{ type: "tween", duration: 0.25 }}
          />
          <motion.div
            id="shop-modal"
            className="row align-items-center justify-content-center w-75 h-75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <div>
              <div className="row justify-content-center align-items-center text-center">
                <h2 id="modal-title" className="p-2">
                  Smelter
                </h2>
              </div>
              <div className="row justify-content-center">
                <div className="col-6 text-center border border-2 border-dark rounded">
                  <h5 id="modal-title" className="py-2">
                    You can smelt your Crystals that you got from dungeon to
                    Monster Token. You get 5 Monster Token for every single
                    Crystals that you smelted.
                  </h5>
                </div>
              </div>
              <div className="row justify-content-center align-items-center my-3">
                <div className="col-4 text-center">
                  <h5 id="text" className="m-0 text-white p-2">
                    Your Crystals
                  </h5>
                  <div className="d-flex justify-content-around align-items-center my-2">
                    <h5 id="text" className="m-0 text-white col-2">
                      {"<"}
                    </h5>
                    <div className="d-flex justify-content-center align-items-center">
                      <img
                        src="/4.png"
                        width={"18%"}
                        alt="crystal-img"
                        className="my-2"
                      />
                      <input
                        type={text}
                        id="text"
                        className="col-4 text-center rounded m-0 mx-2  p-1"
                        value={crystals}
                        onChange={(input) =>
                          crystals > parseInt(inventory)
                            ? setCrystals(parseInt(inventory))
                            : setCrystals(input.target.value)
                        }
                      />
                      <h5 id="text" className="m-0 p-2 text-white">
                        / {crytalsInInventory.data?.toString()}
                      </h5>
                    </div>

                    <h5 id="text" className="col-2 m-0 text-white">
                      {">"}
                    </h5>
                  </div>
                  <button
                    id="text"
                    className="btn btn-primary w-75"
                    onClick={() => startSmelt.mutate()}
                  >
                    <h5 className="m-0 p-0">Smelt</h5>
                  </button>
                </div>
                <div className="col-2 text-center">
                  <img
                    src="/back_icon.png"
                    width={"30%"}
                    alt="arrow-icon"
                    style={{ transform: "rotate(180deg)" }}
                  />
                </div>
                <div className="col-4 text-center">
                  <h5 id="text" className="m-0 text-white p-2">
                    Crystals in Smelter
                  </h5>
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src="/4.png"
                      width={"18%"}
                      alt="crystal-img"
                      className="my-2"
                    />
                    <h5 id="text" className="m-0 p-2 text-white">
                      x {crystalsInSmelter.data?.toString()}
                    </h5>
                  </div>
                  <TimeButton
                    path={"smelter"}
                    onClick={() => finishSmelting}
                    width={"w-75"}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SmelterModal;
