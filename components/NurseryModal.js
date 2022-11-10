import React, { useContext, useEffect, useState } from "react";
import { nurseryContract } from "../hooks/useContract";
import MonsterSelection from "./MonsterSelection";
import useProvider from "../hooks/useProvider";
import useMonsterSelected from "../hooks/useMonsterSelected";
import AppContext from "../contexts/AppContext";
import Modal from "./modals/Modal";
import TimeButton from "./TimeButton";
import { DefaultControl } from "./buttons/IncrementDecrementControl";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMonstersOnNursery } from "../fetchers/fetchers";
import { finishResting, startResting } from "../mutations/mutations";

const NurseryModal = ({ showNursery, toggleShowNursery }) => {
  const user = useContext(AppContext).account[0];
  const [duration, setDuration] = useState(1);
  const monstersOnNursery = useQuery(
    ["monstersOnNursery", user],
    getMonstersOnNursery(user)
  );
  const [showSelectMonster, setShowSelectMonster] = useState(false);
  const [monsterSelected, selectMonster, deselectMonster, clearMonsters] =
    useMonsterSelected();
  const sendMonstersToNursery = useMutation(() =>
    startResting(duration, monsterSelected.length)
  );
  const bringBackFromNursery = useMutation(() => finishResting());

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
              {monstersOnNursery.data?.length < 1 ? (
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
                monstersOnNursery.data?.map((monster, index) => (
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
              {monstersOnNursery.data?.length < 0 ? (
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
              disabled={monstersOnNursery.data?.length > 0}
              className="btn btn-primary p-2 col-3 m-2"
              onClick={() => setShowSelectMonster(true)}
            >
              Select Monsters
            </button>
            {monstersOnNursery.data?.length < 1 ? (
              <button
                id="text"
                className="btn btn-success p-2 col-3 m-2"
                onClick={sendMonstersToNursery.mutate()}
              >
                Send Monsters
              </button>
            ) : (
              <TimeButton
                path={"nursery"}
                onClick={bringBackFromNursery.mutate()}
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
