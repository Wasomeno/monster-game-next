import React, { useContext, useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import MonsterSelection from "../MonsterSelection";
import AppContext from "../../contexts/AppContext";
import useMonsterSelected from "../../hooks/useMonsterSelected";
import { getDungeonTime, getMonstersOnDungeon } from "../../fetchers/fetchers";
import { finishDungeon, sendToDungeon } from "../../mutations/mutations";
import { RewardsModal } from "./RewardsModal";
import { dungeonModalStores } from "../../stores/modalStores";
import {
  finishDungeonSides,
  monstersToDungeonsSides,
} from "../../mutations/sideffects";
import BackButton from "../buttons/BackButton";

const DungeonModal = () => {
  const [show, toggleShow] = dungeonModalStores((state) => [
    state.show,
    state.toggleShow,
  ]);
  const [showDungeonSelect, setShowDungeonSelect] = useState(false);
  const user = useContext(AppContext).account[0];
  const monstersOnDungeon = useQuery(
    ["monstersOnDungeon", user],
    getMonstersOnDungeon(user)
  );
  const dungeonTime = useQuery(["dungeonTime", user], () =>
    getDungeonTime(user)
  );
  const [monsterSelected, selectMonster, deselectMonster, clearMonsters] =
    useMonsterSelected();
  const startDungeonMutation = useMutation(
    () => sendToDungeon(monsterSelected),
    monstersToDungeonsSides()
  );
  const finishDungeonMutation = useMutation(
    () => finishDungeon(),
    finishDungeonSides()
  );

  console.log(monstersOnDungeon.data);

  function showRewards() {
    let rewardsGot = [];
    toast.spinner("Getting your rewards...");
    itemsHandler.on("BossFightReward", (_monster, _items, _amount) => {
      if (_items.length === 0 && _amount.length === 0) return;
      rewardsGot.push({ _monster, _items, _amount });
    });
    setRewards(rewardsGot);
    setTimeout(() => {
      toast.toggleToast();
      toast.toggleSpinner();
    }, 3000);
    setTimeout(() => toggleRewardsModal(), 3500);
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
            <BackButton
              onClick={
                showDungeonSelect
                  ? () => setShowDungeonSelect(false)
                  : toggleShow
              }
            />
            {showDungeonSelect ? (
              <MonsterSelection
                monsterSelected={monsterSelected}
                selectMonster={selectMonster}
                deselectMonster={deselectMonster}
              />
            ) : (
              <>
                <div className="row justify-content-center">
                  <h2 className="text-center" id="modal-title">
                    Dungeon
                  </h2>
                </div>
                <div className="row justify-content-center">
                  <div className="col-6 text-center border border-2 border-light border-opacity-25 rounded">
                    <h5 className="py-2" id="modal-title">
                      Send your monsters to fight bosses in the dungeon.Dungeon
                      will give better rewards than the missions. There's a
                      percentage of what reward that you can get based on the
                      level of your monster. So no level requirement but the
                      higher the level of a monster will increase the chances of
                      getting better rewards.
                    </h5>
                  </div>
                </div>
                <div className="row justify-content-center my-3">
                  <div className="p-3 col-6 d-flex justify-content-center align-items-center border border-light border-2 rounded">
                    {monstersOnDungeon.data?.length < 1 ? (
                      monsterSelected.length !== 0 ? (
                        monsterSelected.map((monster, index) => (
                          <div
                            key={index}
                            id="selected-monster-box"
                            className="p-2 mx-2 text-center d-flex justify-content-center align-items-center"
                          >
                            {monster.toString()}
                          </div>
                        ))
                      ) : (
                        <h5 id="modal-title">No Monsters Selected</h5>
                      )
                    ) : (
                      monstersOnDungeon.data?.map((monster, index) => (
                        <div
                          key={index}
                          id="selected-monster-box"
                          className="p-2 mx-2 text-center d-flex justify-content-center align-items-center"
                        >
                          {monster.toString()}
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div className="row justify-content-center p-2 my-3">
                  <button
                    disabled={dungeonTime.data >= 0 ? false : true}
                    style={{ fontSize: "20px", fontFamily: "Monogram" }}
                    className="btn btn-primary p-2 col-3 m-2"
                    onClick={() => setShowDungeonSelect(true)}
                  >
                    Select Monsters
                  </button>
                  {monstersOnDungeon.data?.length < 1 ? (
                    <button
                      className="btn btn-success col-3 m-2"
                      style={{ fontSize: "20px", fontFamily: "Monogram" }}
                      onClick={() => startDungeonMutation.mutate()}
                    >
                      Send Monsters
                    </button>
                  ) : (
                    <button
                      disabled={dungeonTime.data >= 0 ? false : true}
                      style={{ fontSize: "20px", fontFamily: "Monogram" }}
                      className="btn btn-danger col-3 m-2"
                      onClick={() => finishDungeonMutation.mutate()}
                    >
                      {dungeonTime.data >= 0
                        ? "Finish Dungeon"
                        : Math.abs(dungeonTime.data) + " Minutes"}
                    </button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DungeonModal;
