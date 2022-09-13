import React, { useContext, useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { nurseryContract } from "../helpers/contractConnection";
import MonsterSelection from "./MonsterSelection";
import AppContext from "./AppContext";

const NurseryModal = ({ showNursery, setShowNursery }) => {
  const [onNursery, setOnNursery] = useState([]);
  const [showSelectMonster, setShowSelectMonster] = useState(false);
  const [monsterSelected, setMonsterSelected] = useState([]);
  const [loadingOnNursery, setLoadingOnNursery] = useState(false);
  const [duration, setDuration] = useState([]);

  const connection = useContext(AppContext);
  const nurseryHandler = nurseryContract();

  async function sendToNursery(monster, index) {
    const price = 100000 * duration[index];
    const durationBigInt = BigNumber.from(duration[index]);
    await toast
      .promise(
        nurseryHandler.putOnNursery(
          monster,
          connection.account[0],
          durationBigInt,
          {
            value: ethers.utils.parseUnits(price.toString(), "gwei"),
          }
        ),
        {
          pending: "🗳️ Sending Monster #" + monster + " to nursery...",
          success: "Waiting for confirmation",
          error: "Failed sending monster to nursery",
        }
      )
      .then((response) => {
        toast
          .promise(provider.waitForTransaction(response.hash), {
            pending: "Waiting for confirmation",
            success: "Monster #" + monster + " rest on nursery",
            error: "Failed sending monster to nursery",
          })
          .then(() => {
            getOnNursery();
          });
      });
  }

  async function goBackHome(monster) {
    await nurseryHandler
      .goBackHome(monster, connection.account[0])
      .then((response) => {
        provider.waitForTransaction(response.hash).then((response) => {
          getOnNursery();
        });
      });
  }

  async function getOnNursery() {
    // setLoadingOnNursery(true);
    // await nurseryHandler
    //   .getMyMonsters(connection.account[0])
    //   .then((response) => {
    //     setOnNursery(response);
    //   });
    // setLoadingOnNursery(false);
  }

  const increment = (index) => {
    let test = [...duration];
    if (test[index] >= 5) return;
    test[index] = test[index] + 1;
    setDuration(test);
  };

  const decrement = (index) => {
    let test = [...duration];
    if (test[index] <= 1) return;
    test[index] = test[index] - 1;
    setDuration(test);
  };

  useEffect(() => {
    getOnNursery();
  }, []);

  if (!showNursery) return;
  return (
    <>
      <motion.div
        id="modal-screen"
        className="h-100 w-100 bg-dark bg-opacity-75"
        onClick={() => setShowNursery(false)}
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
        transition={{ type: "tween", duration: 0.25 }}
      >
        <img
          src="/back_icon.png"
          onClick={() =>
            !showSelectMonster
              ? setShowNursery(false)
              : setShowSelectMonster(false)
          }
          width={"45px"}
          alt="back-img"
        />
        {!showSelectMonster ? (
          <>
            <div className="row justify-content-center">
              <h2 className="text-center" id="modal-title">
                Nursery
              </h2>
            </div>
            <div className="row justify-content-center">
              <h5 id="modal-title" className="col-6">
                You can put your monsters to rest at the nursery. Choose for how
                long your monsters will rest (hourly) and for each hour there's
                a fee that you need to pay. Max amount of monsters that you can
                send is 6.
              </h5>
            </div>
            <div className="row justify-content-center my-3">
              <div className="p-3 col-6 d-flex justify-content-center align-items-center border border-dark border-2 rounded">
                {monsterSelected.length !== 0 ? (
                  monsterSelected.map((monster, index) => (
                    <div
                      id="selected-monster-box"
                      className="p-2 mx-2 text-center d-flex justify-content-center align-items-center"
                    >
                      {monster}
                    </div>
                  ))
                ) : (
                  <h5 id="modal-title">No Monsters Selected</h5>
                )}
              </div>
            </div>
            <div className="row justify-content-center p-2 my-3">
              <button
                className="btn btn-primary p-2 col-3 m-2"
                onClick={() => setShowSelectMonster(true)}
              >
                Select Monsters
              </button>
              {onNursery.length < 1 ? (
                <button className="btn btn-success p-2 col-3 m-2">
                  Send Monsters
                </button>
              ) : (
                <button className="btn btn-danger p-2 col-3 m-2">
                  Bring back Monsters
                </button>
              )}
            </div>
          </>
        ) : (
          <MonsterSelection
            monsterSelected={monsterSelected}
            setMonsterSelected={setMonsterSelected}
          />
        )}
      </motion.div>
    </>
  );
};

export default NurseryModal;
