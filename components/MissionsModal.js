import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import MonsterSelection from "./MonsterSelection";
import { monsterGameContract } from "../helpers/contractConnection";
import AppContext from "./AppContext";

const MissionsModal = ({
  showBeginner,
  showInter,
  setShowBeginner,
  setShowInter,
}) => {
  const [onMission, setOnMission] = useState([]);
  const [loadingOnMission, setLoadingOnMission] = useState(false);
  const [beginnerSelected, setBeginnerSelected] = useState([]);
  const [interSelected, setInterSelected] = useState([]);
  const [showBeginnerSelect, setShowBeginnerSelect] = useState(false);
  const [showInterMediateSelect, setShowInterMediateSelect] = useState(false);

  const connection = useContext(AppContext);
  const monsterGame = monsterGameContract();

  async function getMonstersOnMissions() {
    setLoadingOnMission(true);
    if (!showInter) {
      await monsterGame
        .getMonstersOnBeginner(connection.account[0])
        .then((response) => {
          setOnMission(response);
        });
      setLoadingOnMission(false);
    } else {
      await monsterGame
        .getMonstersOnIntermediate(connection.account[0])
        .then((response) => {
          setOnMission(response);
        });
      setLoadingOnMission(false);
    }
  }

  async function sendToBeginner(monster) {
    await monsterGame
      .beginnerMission(monster, connection.account[0])
      .then((response) => {
        provider.waitForTransaction(response.hash).then(() => {
          getMonstersOnMissions();
        });
      });
  }

  async function claimBeginner(monster) {
    await monsterGame
      .claimBeginnerMission(monster, connection.account[0])
      .then((response) => {
        provider.waitForTransaction(response.hash).then(() => {
          getMonstersOnMissions();
        });
      });
  }

  async function sendToIntermediate(monster) {
    await monsterGame
      .intermediateMission(monster, connection.account[0])
      .then((response) => {
        provider.waitForTransaction(response.hash).then(() => {
          getMonstersOnMissions();
        });
      });
  }

  async function claimIntermediate(monster) {
    await monsterGame
      .claimIntermediateMission(monster, connection.account[0])
      .then((response) => {
        provider.waitForTransaction(response.hash).then(() => {
          getMonstersOnMissions();
        });
      });
  }

  useEffect(() => {
    getMonstersOnMissions();
  }, []);
  if (!showBeginner && !showInter) return;
  return (
    <>
      {showBeginner ? (
        <>
          <img
            src="/back_icon.png"
            onClick={() =>
              showBeginnerSelect
                ? setShowBeginnerSelect(false)
                : setShowBeginner(false)
            }
            width={"45px"}
            alt="back-img"
          />
          <motion.div
            className="container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            {!showBeginnerSelect ? (
              <>
                <div className="row justify-content-center">
                  <h2 id="modal-title" className="text-center">
                    Beginner Mission
                  </h2>
                </div>
                <div className="row justify-content-center">
                  <div className="col-6 text-center border border-2 border-dark rounded">
                    <h5 id="modal-title" className="py-2">
                      Beginner mission will give you less rewards than
                      intermediate mission. But there's no level requirement
                      when sending monster to beginner mission. So start sending
                      your monsters to beginner mission until they hit the
                      requirement level for intermediate mission.
                    </h5>
                  </div>
                </div>
                <div className="row justify-content-center my-3">
                  <div className="p-3 col-6 d-flex justify-content-center align-items-center border border-dark border-2 rounded">
                    {beginnerSelected.length !== 0 ? (
                      beginnerSelected.map((monster, index) => (
                        <div
                          key={index}
                          className="p-2 mx-2 text-center d-flex justify-content-center align-items-center"
                          style={{
                            backgroundColor: "#D8CCA3",
                            width: "4rem",
                            height: "4rem",
                          }}
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
                    style={{ fontSize: "20px", fontFamily: "Monogram" }}
                    className="btn btn-primary p-2 col-3 m-2"
                    onClick={() => setShowBeginnerSelect(true)}
                  >
                    Select Monsters
                  </button>
                  {onMission.length < 1 ? (
                    <button
                      style={{ fontSize: "20px", fontFamily: "Monogram" }}
                      className="btn btn-success p-2 col-3 m-2"
                    >
                      Send Monsters
                    </button>
                  ) : (
                    <button
                      style={{ fontSize: "20px", fontFamily: "Monogram" }}
                      className="btn btn-danger p-2 col-3 m-2"
                    >
                      Bring back Monsters
                    </button>
                  )}
                </div>
              </>
            ) : (
              <MonsterSelection
                monsterSelected={beginnerSelected}
                setMonsterSelected={setBeginnerSelected}
              />
            )}
          </motion.div>
        </>
      ) : (
        <>
          <img
            src="/back_icon.png"
            onClick={() =>
              showInterMediateSelect
                ? setShowInterMediateSelect(false)
                : setShowInter(false)
            }
            width={"45px"}
            alt="back-img"
          />
          <motion.div
            className="container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            {!showInterMediateSelect ? (
              <>
                <div className="row justify-content-center">
                  <h2 id="modal-title" className="text-center">
                    Intermediate Mission
                  </h2>
                </div>
                <div className="row justify-content-center">
                  <div className="col-6 text-center border border-2 border-dark rounded">
                    <h5 id="modal-title" className="py-2">
                      Intermediate mission will give you more rewards than
                      beginner mission. There's level requirement when sending
                      monster to intermediate mission. Make sure your monsters
                      match the required level.
                    </h5>
                  </div>
                </div>
                <div className="row justify-content-center my-3">
                  <div className="p-3 col-6 d-flex justify-content-center align-items-center border border-dark border-2 rounded">
                    {interSelected.length !== 0 ? (
                      interSelected.map((monster, index) => (
                        <div
                          key={index}
                          className="p-2 mx-2 text-center d-flex justify-content-center align-items-center"
                          style={{
                            backgroundColor: "#D8CCA3",
                            width: "4rem",
                            height: "4rem",
                          }}
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
                    style={{ fontSize: "20px", fontFamily: "Monogram" }}
                    className="btn btn-primary p-2 col-3 m-2"
                    onClick={() => setShowInterMediateSelect(true)}
                  >
                    Select Monsters
                  </button>
                  {onMission.length < 1 ? (
                    <button
                      className="btn btn-success col-3 m-2"
                      style={{ fontSize: "20px", fontFamily: "Monogram" }}
                    >
                      Send Monsters
                    </button>
                  ) : (
                    <button
                      style={{ fontSize: "20px", fontFamily: "Monogram" }}
                      className="btn btn-danger col-3 m-2"
                    >
                      Bring back Monsters
                    </button>
                  )}
                </div>
              </>
            ) : (
              <MonsterSelection
                monsterSelected={interSelected}
                setMonsterSelected={setInterSelected}
              />
            )}
          </motion.div>
        </>
      )}
    </>
  );
};

export default MissionsModal;
