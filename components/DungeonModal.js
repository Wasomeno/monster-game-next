import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { setLoading } from "./LoadingScreen";
import MonsterSelection from "./MonsterSelection";
import { dungeonContract } from "../hooks/useContract";
import AppContext from "./AppContext";
import useMonsterSelected from "../hooks/useMonsterSelected";
import useProvider from "../hooks/useProvider";

const DungeonModal = ({ showDungeon, toggleShowDungeon }) => {
  const [showDungeonSelect, setShowDungeonSelect] = useState(false);
  const [onDungeon, setOnDungeon] = useState([]);
  const [monsterSelected, selectMonster, deselectMonster] =
    useMonsterSelected();
  const [loadingOnDungeon, setLoadingOnDungeon] = useState(false);
  const [setLoadingText, toggleLoading, LoadingScreen] = setLoading();
  const connection = useContext(AppContext);
  const dungeonHandler = dungeonContract();
  const provider = useProvider();

  async function getMonstersOnDungeon() {
    setLoadingOnDungeon(true);
    await dungeonHandler
      .getMonstersOnDungeon(connection.account[0])
      .then((response) => {
        setOnDungeon(response);
      });
    setLoadingOnDungeon(false);
  }

  async function sendToDungeon() {
    await dungeonHandler
      .startDungeon(monsterSelected, connection.account[0])
      .then((response) => {
        setLoadingText("Sending Monsters to Dungeon...");
        toggleLoading();
        provider.waitForTransaction(response.hash).then(() => {
          getMonstersOnDungeon();
          toggleLoading();
        });
      });
  }

  async function finishDungeon(monster) {
    await dungeonHandler
      .finishDungeon(connection.account[0])
      .then((response) => {
        setLoadingText("Bringing Your Monsters Back...");
        toggleLoading();
        provider.waitForTransaction(response.hash).then(() => {
          getMonstersOnDungeon();
          toggleLoading();
        });
      });
  }

  useEffect(() => {
    getMonstersOnDungeon();
    console.log(onDungeon);
  }, [onDungeon.length]);

  if (!showDungeon) return;
  return (
    <>
      <LoadingScreen />
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
                  style={{ fontSize: "20px", fontFamily: "Monogram" }}
                  className="btn btn-danger col-3 m-2"
                  onClick={finishDungeon}
                >
                  Bring back Monsters
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
