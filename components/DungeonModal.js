import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { setLoading } from "./LoadingScreen";
import MonsterSelection from "./MonsterSelection";
import { dungeonContract } from "../hooks/useContract";
import AppContext from "./AppContext";
import useMonsterSelected from "../hooks/useMonsterSelected";
import useProvider from "../hooks/useProvider";
import { dungeonTime } from "../helpers/getTime";

const DungeonModal = ({ showDungeon, toggleShowDungeon }) => {
  const [showDungeonSelect, setShowDungeonSelect] = useState(false);
  const [onDungeon, setOnDungeon] = useState([]);
  const [monsterSelected, selectMonster, deselectMonster, clearMonsters] =
    useMonsterSelected();
  const [loadingOnDungeon, setLoadingOnDungeon] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const user = useContext(AppContext).account[0];
  const toast = useContext(AppContext).toast;
  const loading = useContext(AppContext).loading;
  const dungeonHandler = dungeonContract();
  const provider = useProvider();

  async function getMonstersOnDungeon() {
    setLoadingOnDungeon(true);
    await dungeonHandler.getMonstersOnDungeon(user).then((response) => {
      setOnDungeon(response);
    });
    setLoadingOnDungeon(false);
  }

  async function getDungeonTime() {
    const time = await dungeonTime(user);
    setTimeElapsed(time);
  }

  async function sendToDungeon() {
    try {
      await dungeonHandler
        .startDungeon(monsterSelected, user)
        .then((response) => {
          loading.setLoadingText("Sending Monsters to Dungeon...");
          loading.toggleLoading();
          provider.waitForTransaction(response.hash).then(() => {
            loading.toggleLoading();
            getMonstersOnDungeon();
          });
        });
    } catch (error) {
      toast.setToastText(error.reason);
      toast.setCondition("error");
      toast.toggleToast();
      setTimeout(toast.toggleToast(), 2000);
    }
  }

  async function finishDungeon() {
    try {
      await dungeonHandler.finishDungeon(user).then((response) => {
        loading.setLoadingText("Bringing Your Monsters Back...");
        loading.toggleLoading();
        provider.waitForTransaction(response.hash).then(() => {
          clearMonsters();
          loading.toggleLoading();
          getMonstersOnDungeon();
        });
      });
    } catch (error) {
      toast.setToastText(error.reason);
      toast.setCondition("error");
      toast.toggleToast();
      setTimeout(toggleToast(), 2000);
    }
  }

  useEffect(() => {
    getMonstersOnDungeon();
    getDungeonTime();
    console.log(timeElapsed);
  }, [showDungeon, onDungeon.length]);

  if (!showDungeon) return;
  return (
    <>
      <motion.div
        id="modal-screen"
        className="h-100 w-100 bg-dark bg-opacity-75"
        onClick={toggleShowDungeon}
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
            showDungeonSelect
              ? () => setShowDungeonSelect(false)
              : toggleShowDungeon
          }
          width={"45px"}
          alt="back-img"
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
              <div className="col-6 text-center border border-2 border-dark rounded">
                <h5 className="py-2" id="modal-title">
                  Send your monsters to fight bosses in the dungeon.Dungeon will
                  give better rewards than the missions. There's a percentage of
                  what reward that you can get based on the level of your
                  monster. So no level requirement but the higher the level of a
                  monster will increase the chances of getting better rewards.
                </h5>
              </div>
            </div>
            <div className="row justify-content-center my-3">
              <div className="p-3 col-6 d-flex justify-content-center align-items-center border border-dark border-2 rounded">
                {onDungeon < 1 ? (
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
                  onDungeon.map((monster, index) => (
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
                style={{ fontSize: "20px", fontFamily: "Monogram" }}
                className="btn btn-primary p-2 col-3 m-2"
                onClick={() => setShowDungeonSelect(true)}
              >
                Select Monsters
              </button>
              {onDungeon.length < 1 ? (
                <button
                  className="btn btn-success col-3 m-2"
                  style={{ fontSize: "20px", fontFamily: "Monogram" }}
                  onClick={sendToDungeon}
                >
                  Send Monsters
                </button>
              ) : (
                <button
                  // disabled={timeElapsed >= 0 ? false : true}
                  style={{ fontSize: "20px", fontFamily: "Monogram" }}
                  className="btn btn-danger col-3 m-2"
                  onClick={finishDungeon}
                >
                  {timeElapsed >= 0
                    ? "Finish Mission"
                    : Math.abs(timeElapsed) + " Minutes"}
                </button>
              )}
            </div>
          </>
        )}
      </motion.div>
    </>
  );
};

export default DungeonModal;
