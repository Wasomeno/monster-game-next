import React, { useContext, useEffect, useState } from "react";
import { nurseryContract } from "../hooks/useContract";
import { nurseryTime } from "../helpers/getTime";
import MonsterSelection from "./MonsterSelection";
import useProvider from "../hooks/useProvider";
import useMonsterSelected from "../hooks/useMonsterSelected";
import AppContext from "./AppContext";
import Modal from "./modals/Modal";
import TimeButton from "./TimeButton";
import { DefaultControl } from "./buttons/IncrementDecrementControl";

const NurseryModal = ({ showNursery, toggleShowNursery }) => {
  const user = useContext(AppContext).account[0];
  const [onNursery, setOnNursery] = useState([]);
  const [showSelectMonster, setShowSelectMonster] = useState(false);
  const [monsterSelected, selectMonster, deselectMonster, clearMonsters] =
    useMonsterSelected();
  const [duration, setDuration] = useState(1);
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
      await nurseryHandler.finishResting().then((response) => {
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

  async function getOnNursery() {
    await nurseryHandler.getRestingMonsters(user).then((monsters) => {
      setOnNursery(monsters);
    });
  }

  useEffect(() => {
    getOnNursery();
  }, [onNursery.length]);

  if (!showNursery) return;
  return (
    <Modal selector={"#modal"}>
      <img
        className="m-2"
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
        <div className="d-flex w-100 h-75 flex-column justify-content-center">
          <div className="row justify-content-center">
            <h2 className="text-center" id="modal-title">
              Nursery
            </h2>
          </div>
          <div className="row justify-content-center">
            <h5 id="modal-title" className="col-6">
              You can put your monsters to rest at the nursery. Choose for how
              long your monsters will rest (hourly) and for each hour there's a
              fee that you need to pay. Max amount of monsters that you can send
              is 6.
            </h5>
          </div>
          <div className="row justify-content-center my-3">
            <div className="p-3 col-6 d-flex justify-content-center align-items-center border border-2 border-light rounded">
              {onNursery < 1 ? (
                monsterSelected.length !== 0 ? (
                  monsterSelected.map((monster, index) => (
                    <div
                      key={index}
                      id="selected-monster-box"
                      className="p-2 mx-2 rounded text-center d-flex justify-content-center align-items-center"
                      style={{
                        backgroundImage: `url("/monsters/${
                          parseInt(monster) + 1
                        }.png")`,
                      }}
                    />
                  ))
                ) : (
                  <h5 id="modal-title">No Monsters Selected</h5>
                )
              ) : (
                onNursery.map((monster, index) => (
                  <div
                    key={index}
                    id="selected-monster-box"
                    className="p-2 mx-2 rounded text-center d-flex justify-content-center align-items-center"
                    style={{
                      backgroundImage: `url("/monsters/${
                        parseInt(monster) + 1
                      }.png")`,
                    }}
                  />
                ))
              )}
            </div>
            <div className="col-2 mx-2 border border-2 border-light rounded">
              {onNursery.length < 0 ? (
                <div className="row align-items-center">
                  <h5 id="text" className="text-white text-center m-0 p-2">
                    You're Resting
                  </h5>
                </div>
              ) : (
                <>
                  <h5 id="text" className="text-white text-center">
                    Duration
                  </h5>
                  <DefaultControl
                    max={6}
                    value={duration}
                    setValue={setDuration}
                  />
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
              <TimeButton
                path={"nursery"}
                onClick={finishResting}
                width={"col-3"}
              />
            )}
          </div>
        </div>
      ) : (
        <MonsterSelection
          monsterSelected={monsterSelected}
          selectMonster={selectMonster}
          deselectMonster={deselectMonster}
        />
      )}
    </Modal>
  );
};

export default NurseryModal;
