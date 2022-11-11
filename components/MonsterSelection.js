import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useContext } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import AppContext from "../contexts/AppContext";
import { getInactiveMonsters } from "../fetchers/fetchers";
import MonsterSelectCard from "./cards/MonsterSelectCard";

const MonsterSelection = ({
  monsterSelected,
  selectMonster,
  deselectMonster,
}) => {
  const user = useContext(AppContext).account[0];
  const inactiveMonsters = useQuery(["inactiveMonsters", user], () =>
    getInactiveMonsters(user)
  );

  return (
    <div className="container">
      <div className="d-flex">
        <div className="col-8">
          <h3 id="modal-title" className="text-center">
            Select Your Monsters
          </h3>
          <div
            id="monsters-container"
            className="d-flex justify-content-center align-items-start h-100 w-100"
          >
            <div className="d-flex flex-wrap justify-content-center p-3 align-items-center w-100">
              {inactiveMonsters.isLoading && (
                <MoonLoader
                  size={50}
                  loading={inactiveMonsters.isLoading}
                  color="#EEEEEE"
                />
              )}
              {!inactiveMonsters.isLoading &&
                (inactiveMonsters.data?.length < 1 ? (
                  <h5 className="text-center text-white" id="text">
                    No Monsters in Inventory
                  </h5>
                ) : (
                  inactiveMonsters.data?.map((monster) => (
                    <MonsterSelectCard
                      key={monster.id}
                      monster={monster.id}
                      level={monster.level}
                      exp={monster.exp}
                      expCap={monster.expCap}
                      energy={monster.energy}
                      energyCap={monster.energyCap}
                      onClick={() => selectMonster(monster.id)}
                    />
                  ))
                ))}
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
                  style={{
                    position: "absolute",
                    left: "140px",
                    top: "-10px",
                    fontSize: "12px",
                  }}
                >
                  X
                </button>
                <div
                  id="selected-monster-box"
                  className="p-2 text-center d-flex justify-content-center rounded align-items-center"
                  style={{
                    backgroundImage: `url("/monsters/${
                      parseInt(monster) + 1
                    }.png")`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonsterSelection;
