import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MonsterSelection from "../MonsterSelection";
import AppContext from "../../contexts/AppContext";
import useMonsterSelected from "../../hooks/useMonsterSelected";
import { queryClient } from "../../contexts/reactQueryClient";
import { setRewardModal } from "./RewardsModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMissionTime, getMonstersOnMissions } from "../../fetchers/fetchers";
import { finishMission, sendToMission } from "../../mutations/mutations";
import { missionsModalStores } from "../../stores/modalStores";
import { useLoading, useToast } from "../../stores/stores";
import {
  finishMissionSides,
  monstersToMissionSides,
} from "../../mutations/sideffects";

const MissionsModal = () => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  const user = useContext(AppContext).account[0];
  const [show, toggleShow] = missionsModalStores((state) => [
    state.show,
    state.toggleShow,
  ]);
  const [showMissionSelect, setShowMissionSelect] = useState(false);
  const [mission, setMission] = useState(1);
  const monstersOnMission = useQuery(
    ["monstersOnMission", user],
    getMonstersOnMissions(user)
  );
  const [monsterSelected, selectMonster, deselectMonster, clearMonsters] =
    useMonsterSelected();
  const [setRewards, toggleRewardsModal, RewardsModal] = setRewardModal();
  const missionTimeRemaining = useQuery(["missionTime", user], () =>
    getMissionTime(user)
  );
  const sendMonstersToMission = useMutation(
    () => sendToMission(mission, monsterSelected),
    monstersToMissionSides(user)
  );
  const finishMonstersMission = useMutation(
    () => finishMission(),
    finishMissionSides(user)
  );

  function decrement() {
    if (mission === 1) return;
    setMission((current) => current - 1);
  }

  function increment() {
    if (mission === 2) return;
    setMission((current) => current + 1);
  }

  //   itemsHandler.on(
  //     "IntermediateMissionReward",
  //     (_monster, _items, _amount) => {
  //       if (_items.length === 0 && _amount.length === 0) return;
  //       rewardsGot.push({ _monster, _items, _amount });
  //     }
  //   );

  function intoString(nonString) {
    return nonString.toString();
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          <RewardsModal />
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
                  : toggleShow
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
                  <div className="col-6 text-center border border-2 border-light border-opacity-25 rounded">
                    <h5 id="modal-title" className="py-2">
                      Send your monsters to a mission! you can choose between
                      beginner mission and intermediate mission. The rewards
                      between beginner and intermediate mission will be
                      different, the intermediate one of course will reward you
                      more. But there's a level 3 requirement for your monsters
                      to enter the intermediate mission.
                    </h5>
                  </div>
                </div>
                <div className="row justify-content-center my-3">
                  <div className="p-3 mx-2 col-6 d-flex justify-content-center align-items-center border border-light border-opacity-25 border-2 rounded">
                    {monstersOnMission.data?.length < 1 ? (
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
                      monstersOnMission.data?.map((monster, index) => (
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
                  <div className="col-4 justify-content-center align-items-center border border-light border-opacity-25 border-2 rounded mx-1">
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
                        <h5
                          id="text"
                          className="text-white m-0 mx-1 text-center"
                        >
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
                    disabled={monstersOnMission.data?.length > 0}
                    className="btn btn-primary p-2 col-3 m-2"
                    onClick={() => setShowMissionSelect(true)}
                  >
                    Select Monsters
                  </button>
                  {monstersOnMission.data?.length < 1 ? (
                    <button
                      id="text"
                      className="btn btn-success p-2 col-3 m-2"
                      onClick={() => sendMonstersToMission.mutate()}
                    >
                      Send Monsters
                    </button>
                  ) : (
                    <button
                      id="text"
                      disabled={missionTimeRemaining.data >= 0 ? false : true}
                      className="btn btn-danger p-2 col-3 m-2"
                      onClick={() => finishMonstersMission.mutate()}
                    >
                      {missionTimeRemaining.data >= 0
                        ? "Bring back Monsters"
                        : Math.abs(missionTimeRemaining.data) + "  Minutes"}
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
      )}
    </AnimatePresence>
  );
};

export default MissionsModal;
