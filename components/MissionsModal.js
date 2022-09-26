import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import MonsterSelection from "./MonsterSelection";
import { itemsContract, monsterGameContract } from "../hooks/useContract";
import AppContext from "./AppContext";
import useMonsterSelected from "../hooks/useMonsterSelected";
import useProvider from "../hooks/useProvider";
import { missionTime } from "../helpers/getTime";
import { setRewardModal } from "./RewardsModal";

const MissionsModal = ({ showMission, toggleShowMission }) => {
  const [onMission, setOnMission] = useState([]);
  const [monsterSelected, selectMonster, deselectMonster, clearMonsters] =
    useMonsterSelected();
  const [setRewards, toggleRewardsModal, RewardsModal] = setRewardModal();
  const [showMissionSelect, setShowMissionSelect] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [mission, setMission] = useState(1);
  const provider = useProvider();
  const user = useContext(AppContext).account[0];
  const toast = useContext(AppContext).toast;
  const loading = useContext(AppContext).loading;
  const monsterGameHandler = monsterGameContract();
  const itemsHandler = itemsContract();

  async function getMonstersOnMissions() {
    await monsterGameHandler.getMonstersOnMission(user).then((monsters) => {
      setOnMission(monsters);
    });
  }

  function decrement() {
    if (mission === 1) return;
    setMission((current) => current - 1);
  }

  function increment() {
    if (mission === 2) return;
    setMission((current) => current + 1);
  }

  async function sendToMission() {
    try {
      await monsterGameHandler
        .startMission(mission, monsterSelected, user)
        .then((response) => {
          loading.setLoadingText("Sending Monsters to Mission...");
          loading.toggleLoading();
          provider.waitForTransaction(response.hash).then(() => {
            loading.toggleLoading();
            clearMonsters();
            getMonstersOnMissions();
            toast.success("Transaction Success");
          });
        });
    } catch (error) {
      toast.error(error.reason);
    }
  }

  async function finishMission() {
    try {
      await monsterGameHandler.finishMission(mission, user).then((response) => {
        loading.setLoadingText("Bringing Your Monsters Back...");
        loading.toggleLoading();
        provider.waitForTransaction(response.hash).then(() => {
          loading.toggleLoading();
          getMonstersOnMissions();
          toast.success("Transaction Success");
          setTimeout(() => showRewards(), 1500);
        });
      });
    } catch (error) {
      toast.error(error.reason);
    }
  }

  function showRewards() {
    let rewardsGot = [];
    toast.spinner("Getting your rewards...");
    itemsHandler.on("BeginnerMissionReward", (_monster, _items, _amount) => {
      if (_items.length === 0 && _amount.length === 0) return;
      rewardsGot.push({ _monster, _items, _amount });
    });

    itemsHandler.on(
      "IntermediateMissionReward",
      (_monster, _items, _amount) => {
        if (_items.length === 0 && _amount.length === 0) return;
        rewardsGot.push({ _monster, _items, _amount });
      }
    );

    setRewards(rewardsGot);

    setTimeout(() => {
      toast.toggleToast();
      toast.toggleSpinner();
    }, 3000);
    setTimeout(() => toggleRewardsModal(), 3500);
  }

  function intoString(nonString) {
    return nonString.toString();
  }

  async function getMissionTime() {
    const time = await missionTime(user);
    setRemainingTime(time);
  }

  useEffect(() => {
    getMonstersOnMissions();
    getMissionTime();
  }, [showMission, onMission.length]);

  if (!showMission) return;

  return (
    <>
      <RewardsModal />
      <motion.div
        id="modal-screen"
        className="h-100 w-100 bg-dark bg-opacity-75"
        onClick={toggleShowMission}
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
            showMissionSelect
              ? () => setShowMissionSelect(false)
              : toggleShowMission
          }
          width={"45px"}
          alt="back-img"
        />
        {!showMissionSelect ? (
          <>
            <div className="row justify-content-center align-items-center m-3">
              <div className="col-6">
                <h2 id="modal-title" className="text-center">
                  Missions
                </h2>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-6 text-center border border-2 border-dark rounded">
                <h5 id="modal-title" className="py-2">
                  Send your monsters to a mission! you can choose between
                  beginner mission and intermediate mission. The rewards between
                  beginner and intermediate mission will be different, the
                  intermediate one of course will reward you more. But there's a
                  level 3 requirement for your monsters to enter the
                  intermediate mission.
                </h5>
              </div>
            </div>
            <div className="row justify-content-center my-3">
              <div className="p-3 col-6 d-flex justify-content-center align-items-center border border-dark border-2 rounded">
                {onMission < 1 ? (
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
                  onMission.map((monster, index) => (
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
              <div className="col-4 justify-content-center align-items-center border border-dark border-2 rounded mx-1">
                <h5 id="text" className="m-0 p-2 text-white text-center">
                  Mission Types
                </h5>
                <div className="d-flex justify-content-around align-items-center">
                  <div className="col-2" onClick={decrement}>
                    <h5 id="text" className="text-white m-0">
                      {"<"}
                    </h5>
                  </div>
                  <div className="col-6">
                    <h5 id="text" className="text-white m-0 mx-1 text-center">
                      {mission === 1
                        ? "Beginner Mission"
                        : "Intermediate Mission"}
                    </h5>
                  </div>
                  <div className="col-2" onClick={increment}>
                    <h5 id="text" className="text-white m-0">
                      {">"}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center p-2 my-3">
              <button
                id="text"
                disabled={onMission.length > 0}
                className="btn btn-primary p-2 col-3 m-2"
                onClick={() => setShowMissionSelect(true)}
              >
                Select Monsters
              </button>
              {onMission.length < 1 ? (
                <button
                  id="text"
                  className="btn btn-success p-2 col-3 m-2"
                  onClick={sendToMission}
                >
                  Send Monsters
                </button>
              ) : (
                <button
                  id="text"
                  // disabled={remainingTime >= 0 ? false : true}
                  className="btn btn-danger p-2 col-3 m-2"
                  onClick={finishMission}
                >
                  {remainingTime >= 0
                    ? "Bring back Monsters"
                    : Math.abs(remainingTime) + "  Minutes"}
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

export default MissionsModal;
