import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { nurseryContract } from "../hooks/useContract";
import { nurseryTime } from "../helpers/getTime";
import MonsterSelection from "./MonsterSelection";
import useProvider from "../hooks/useProvider";
import useMonsterSelected from "../hooks/useMonsterSelected";
import AppContext from "./AppContext";

const NurseryModal = ({ showNursery, toggleShowNursery }) => {
  const user = useContext(AppContext).account[0];
  const [onNursery, setOnNursery] = useState([]);
  const [showSelectMonster, setShowSelectMonster] = useState(false);
  const [monsterSelected, selectMonster, deselectMonster, clearMonsters] =
    useMonsterSelected();
  const [duration, setDuration] = useState(1);
  const [remainingTime, setRemainingTime] = useState(0);
  const nurseryHandler = nurseryContract();
  const provider = useProvider();
  const loading = useContext(AppContext).loading;
  const toast = useContext(AppContext).toast;

  async function sendToNursery() {
    const fee = await nurseryHandler.RESTING_FEE();
    const totalFee = fee * duration * monsterSelected.length;
    try {
      await nurseryHandler
        .restMonsters(monsterSelected, duration, {
          value: totalFee,
        })
        .then((response) => {
          loading.setLoadingText("Sending Monsters to Nursery...");
          loading.toggleLoading();
          provider.waitForTransaction(response.hash).then(() => {
            loading.toggleLoading();
            clearMonsters();
            getOnNursery();
            toast.success("Transaction Success");
          });
        });
    } catch (error) {
      toast.error(error.reason);
    }
  }

  async function finishResting() {
    try {
      await nurseryHandler.finishResting(user).then((response) => {
        loading.setLoadingText("Bringing Your Monsters Back...");
        loading.toggleLoading();
        provider.waitForTransaction(response.hash).then(() => {
          loading.toggleLoading();
          getOnNursery();
        });
      });
    } catch (error) {
      toast.error(error.reason);
    }
  }

  async function getNurseryTime() {
    const time = await nurseryTime(user);
    setRemainingTime(time);
  }

  function intoString(nonString) {
    return nonString.toString();
  }

  async function getOnNursery() {
    await nurseryHandler.getRestingMonsters(user).then((monsters) => {
      setOnNursery(monsters);
    });
  }

  const increment = () => {
    if (duration >= 5) return;
    setDuration((currentDuration) => currentDuration + 1);
  };

  const decrement = () => {
    if (duration <= 1) return;
    setDuration((currentDuration) => currentDuration - 1);
  };

  useEffect(() => {
    getOnNursery();
    getNurseryTime();
  }, [onNursery.length]);

  if (!showNursery) return;
  return (
    <>
      <motion.div
        id="modal-screen"
        className="h-100 w-100 bg-dark bg-opacity-75"
        onClick={toggleShowNursery}
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
          onClick={
            !showSelectMonster
              ? toggleShowNursery
              : () => setShowSelectMonster(false)
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
                {onNursery < 1 ? (
                  monsterSelected.length !== 0 ? (
                    monsterSelected.map((monster, index) => (
                      <div
                        key={index}
                        id="selected-monster-box"
                        className="p-2 mx-2 text-center d-flex justify-content-center align-items-center"
                      >
                        {intoString(monster)}
                      </div>
                    ))
                  ) : (
                    <h5 id="modal-title">No Monsters Selected</h5>
                  )
                ) : (
                  onNursery.map((monster, index) => (
                    <div
                      key={index}
                      id="selected-monster-box"
                      className="p-2 mx-2 text-center d-flex justify-content-center align-items-center"
                    >
                      {intoString(monster)}
                    </div>
                  ))
                )}
              </div>
              <div className="col-2 mx-2 border border-2 border-dark rounded">
                {onNursery.length > 0 ? (
                  <h5 id="text" className="text-white text-center m-0 p-2">
                    You're Resting
                  </h5>
                ) : (
                  <>
                    <h5 id="text" className="text-white text-center">
                      Duration
                    </h5>
                    <div className="d-flex justify-content-around align-items-center">
                      <h5 id="modal-title" className="m-0" onClick={decrement}>
                        -
                      </h5>
                      <h4 id="text" className="text-white m-0">
                        {duration}
                      </h4>
                      <h5 id="modal-title" className="m-0" onClick={increment}>
                        +
                      </h5>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="row justify-content-center p-2 my-3">
              <button
                id="text"
                disabled={onNursery.length > 0}
                className="btn btn-primary p-2 col-3 m-2"
                onClick={() => setShowSelectMonster(true)}
              >
                Select Monsters
              </button>
              {onNursery.length < 1 ? (
                <button
                  id="text"
                  className="btn btn-success p-2 col-3 m-2"
                  onClick={sendToNursery}
                >
                  Send Monsters
                </button>
              ) : (
                <button
                  id="text"
                  // disabled={remainingTime >= 0 ? false : true}
                  className="btn btn-danger p-2 col-3 m-2"
                  onClick={finishResting}
                >
                  {remainingTime >= 0
                    ? "Bring back Monsters"
                    : Math.abs(remainingTime) + " Minutes"}
                </button>
              )}
            </div>
          </>
        ) : (
          <MonsterSelection
            monsterSelected={monsterSelected}
            selectMonster={selectMonster}
            deselectMonster={deselectMonster}
          />
        )}
      </motion.div>
    </>
  );
};

export default NurseryModal;
