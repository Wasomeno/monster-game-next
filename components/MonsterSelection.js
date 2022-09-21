import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import MoonLoader from "react-spinners/MoonLoader";
import AppContext from "./AppContext";
import { useMonstersInactive } from "../hooks/useMonsters";

const MonsterSelection = ({
  monsterSelected,
  selectMonster,
  deselectMonster,
}) => {
  const connection = useContext(AppContext);
  const user = connection.account[0];
  const { monsters, loading } = useMonstersInactive(user);

  function intoString(nonString) {
    return nonString.toString();
  }

  useEffect(() => {}, [monsters]);

  return (
    <div className="containe-flui p-2">
      <div className="row justify-content-center">
        <div className="col-8">
          <h3 id="modal-title" className="text-center">
            Select Your Monsters
          </h3>
          <div
            id="monsters-container"
            className="d-flex flex-wrap justify-content-center"
          >
            <div className="d-flex flex-wrap justify-content-center">
              {loading ? (
                <MoonLoader size={50} loading={loading} color="#EEEEEE" />
              ) : monsters.length < 1 ? (
                <h5 className="text-center" id="modal-title">
                  No Monsters in Inventory
                </h5>
              ) : (
                monsters.map((monster, index) => (
                  <div
                    key={index}
                    id="monster-card"
                    className="card col-3 d-flex m-2 justify-content-center align-items-center"
                    onClick={() => selectMonster(intoString(monster.id))}
                  >
                    <img
                      className="p-3"
                      src={"/monsters/" + (parseInt(monster.id) + 1) + ".png"}
                      width={"75%"}
                      height={"75%"}
                      alt="..."
                    />
                    <div
                      className="card-body py-1 text-start"
                      style={{ color: "#EEEEEE" }}
                    >
                      <h5 className="card-title" id="modal-title">
                        Monster #{intoString(monster.id)}
                      </h5>
                      <div className="">
                        <h5 id="text">
                          Level : {intoString(monster.level)} / 10;
                        </h5>
                        <h5 id="text">
                          Exp : {intoString(monster.exp)} /{" "}
                          {intoString(monster.expCap)};
                        </h5>
                        <h5 id="text">
                          Hunger : {intoString(monster.energy)} / 100;
                        </h5>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div className="col-3 m-2" />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="row justify-content-center align-items-start">
            <h4 className="text-center" id="modal-title">
              {monsterSelected.length} Monster Selected
            </h4>
          </div>
          <div className="row flex-column justify-content-start align-items-center">
            {monsterSelected.map((monster, index) => (
              <div
                key={index}
                className="p-2 my-2 text-cnter d-flex justify-content-center align-items-start"
                style={{ position: "relative" }}
              >
                <button
                  className="btn btn-danger rounded-circle"
                  onClick={() => deselectMonster(monster)}
                  style={{ position: "absolute", left: "140px", top: "0" }}
                >
                  X
                </button>
                <div
                  id="selected-monster-box"
                  className="p-2 my-2 text-center d-flex justify-content-center align-items-center"
                >
                  {monster}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonsterSelection;
