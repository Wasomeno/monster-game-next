import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import MonsterSelection from "./MonsterSelection";
import { itemsContract, monsterGameContract } from "../hooks/useContract";
import AppContext from "./AppContext";
import useMonsterSelected from "../hooks/useMonsterSelected";
import useProvider from "../hooks/useProvider";
import useToggle from "../hooks/useToggle";
import { setLoading } from "./LoadingScreen";
import MissionFinishedModal from "./MissionFinishedModal";
import { missionTime } from "../helpers/getTime";
import { setToast } from "./Toast";

const MissionsModal = ({ showMission, toggleShowMission }) => {
  const [onMission, setOnMission] = useState([]);
  const [monsterSelected, selectMonster, deselectMonster] =
    useMonsterSelected();
  const [showMissionSelect, setShowMissionSelect] = useState(false);
  const [missionFinished, toggleMissionFinished] = useToggle(false);
  const [rewards, setRewards] = useState([]);
  const [remainingTime, setRemainingTime] = useState(0);
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

  async function sendToMission() {
    try {
      await monsterGameHandler
        .startMission(1, monsterSelected, user)
        .then((response) => {
          loading.setLoadingText("Sending Monsters to Mission...");
          loading.toggleLoading();
          provider.waitForTransaction(response.hash).then(() => {
            loading.toggleLoading();
            getMonstersOnMissions();
          });
        });
    } catch (error) {
      toast.setToastText(error.reason);
      toast.setCondition("error");
      toast.toggleToast();
      setTimeout(() => toast.toggleToast(), 2000);
    }
  }

  async function finishMission() {
    try {
      await monsterGameHandler.finishMission(1, user).then((response) => {
        loading.setLoadingText("Bringing Your Monsters Back...");
        loading.toggleLoading();
        provider.waitForTransaction(response.hash).then(() => {
          loading.toggleLoading();
          getMonstersOnMissions();
        });
      });
    } catch (error) {
      toast.setToastText(error.reason);
      toast.setCondition("error");
      toast.toggleToast();
      setTimeout(() => toast.toggleToast(), 2500);
    }
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
                  disabled={remainingTime >= 0 ? false : true}
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
