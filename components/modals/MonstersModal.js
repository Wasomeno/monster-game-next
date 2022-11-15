import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import MonsterDetails from "../MonsterDetails";
import MoonLoader from "react-spinners/MoonLoader";
import AppContext from "../../contexts/AppContext";
import { useQuery } from "@tanstack/react-query";
import { getAllMonsters } from "../../fetchers/fetchers";
import Image from "next/image";
import BackButton from "../buttons/BackButton";

const MonstersModal = ({ showMonsters, setShowMonsters }) => {
  const user = useContext(AppContext).account[0];
  const monsters = useQuery(["allMonsters", user], () => getAllMonsters(user));
  const [showDetails, setShowDetails] = useState(false);
  const [tokenId, setTokenId] = useState("");

  function monsterDetails(monster) {
    setShowDetails(true);
    setTokenId(monster);
  }

  if (!showMonsters) return;
  return (
    <>
      <motion.div
        id="modal-screen"
        className="h-100 w-100 bg-dark bg-opacity-75"
        onClick={() => setShowMonsters(false)}
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
        {!showDetails ? (
          <>
            <div className="row justify-content-center align-items-center">
              <div className="col-4">
                <BackButton onClick={() => setShowMonsters(false)} />
              </div>
              <div className="col-4">
                <h2 className="text-center p-3" id="modal-title">
                  Your Monsters
                </h2>
              </div>
              <div className="col-4" />
            </div>
            <div
              className="d-flex justify-content-center align-items-start flex-wrap p-3 "
              style={{ height: "75%", overflow: "scroll" }}
            >
              {monsters.isLoading ? (
                <MoonLoader
                  size={50}
                  loading={monsters.isLoading}
                  color={"#eee"}
                />
              ) : monsters < 1 ? (
                <h5 className="m-0" id="modal-title">
                  You don't have a monster
                </h5>
              ) : (
                monsters.data?.map((monster, index) => (
                  <div
                    key={index}
                    id="monster-card"
                    style={{ height: "18rem" }}
                    className="card col-2 m-1 p-3 shadow-sm d-flex flex-column justify-content-center align-items-center"
                    onClick={() => monsterDetails(monster.id.toString())}
                  >
                    {parseInt(monster.status) === 1 ? (
                      <Image
                        src="/emotes/mission_emote.gif"
                        width={"25%"}
                        height={"25%"}
                        alt="activity-icon"
                        className="align-self-end p-1 my-1 bg-primary bg-opacity-25 rounded-circle"
                      />
                    ) : parseInt(monster.status) === 2 ? (
                      <img
                        src="/emotes/resting_emote.gif"
                        width={"25%"}
                        alt="activity-icon"
                        className="align-self-end"
                      />
                    ) : parseInt(monster.status) === 3 ? (
                      <img
                        src="/emotes/mission_emote.gif"
                        width={"25%"}
                        alt="activity-icon"
                        className="align-self-end"
                      />
                    ) : (
                      <></>
                    )}

                    <img
                      src={"/monsters/" + (parseInt(monster.id) + 1) + ".png"}
                      alt="monster-img"
                      width={"75%"}
                      height={"50%"}
                    />
                    <div className="text-center p-0">
                      <h5 className="card-title" id="modal-title">
                        Monster #{monster.id.toString()}
                      </h5>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <MonsterDetails
            tokenId={tokenId}
            setShowDetails={setShowDetails}
            setTokenId={setTokenId}
            showDetails={showDetails}
          />
        )}
      </motion.div>
    </>
  );
};

export default MonstersModal;
