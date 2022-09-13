import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import MoonLoader from "react-spinners/MoonLoader";
import { monsterContract } from "../helpers/contractConnection";
import AppContext from "./AppContext";

const MonsterSelection = ({ monsterSelected, setMonsterSelected }) => {
  const [monsters, setMonsters] = useState([]);
  const [loadingMonster, setLoadingMonster] = useState(false);
  const contract = monsterContract();
  const connection = useContext(AppContext);

  async function getMonsters() {
    let monstersTemp = [];
    setLoadingMonster(true);
    const myMonsters = await contract.getMyMonster(connection.account[0]);
    for (let monster of myMonsters) {
      const status = await contract.getMonsterStatus(monster);
      if (status.toString() === "0") {
        const level = await contract.getMonsterLevel(monster);
        const exp = await contract.getMonsterExp(monster);
        const expCap = await contract.getMonsterExpCap(monster);
        const hunger = await contract.getMonsterHunger(monster);
        monstersTemp.push({
          id: monster.toString(),
          level: level.toString(),
          exp: exp.toString(),
          expCap: expCap.toString(),
          hunger: hunger.toString(),
        });
      }
    }
    setMonsters(monstersTemp);
    setLoadingMonster(false);
  }
  function checkSelectedMonsters(_monster) {
    let result = true;
    if (monsterSelected.length < 1) {
      setMonsterSelected((currentSelected) => [...currentSelected, _monster]);
    } else {
      for (let monster of monsterSelected) {
        if (_monster === monster) {
          result = false;
          toast.error("Monster #" + _monster + " already selected", {
            autoClose: 2000,
          });
        }
      }
      return result;
    }
  }

  function selectMonster(index) {
    if (monsterSelected.length >= 6) return;
    let monster = monsters[index];
    let result = checkSelectedMonsters(monster.id);
    if (!result) return;
    setMonsterSelected((currentSelected) => [
      ...currentSelected,
      monster.id.toString(),
    ]);
  }

  function deselectMonster(index) {
    let monster = monsterSelected[index];
    setMonsterSelected((currentSelected) =>
      currentSelected.filter((selected) => selected !== monster)
    );
  }

  useEffect(() => {
    getMonsters();
  }, []);

  return (
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
            {loadingMonster ? (
              <MoonLoader size={50} loading={loadingMonster} color="#EEEEEE" />
            ) : monsters.length < 1 ? (
              <h5 className="text-center" id="modal-title">
                No Monsters in Inventory
              </h5>
            ) : (
              monsters.map((monster, index) => (
                <>
                  <div
                    id="monster-card"
                    className="card col-3 d-flex m-2 justify-content-center align-items-center"
                    key={index}
                    onClick={() => selectMonster(index)}
                  >
                    <img src="/monster.png" width={"50%"} alt="..." />
                    <div
                      className="card-body py-1 text-start"
                      style={{ color: "#EEEEEE" }}
                    >
                      <h5 className="card-title" id="modal-title">
                        Monster #{monster.id}
                      </h5>
                      <div className="">
                        <h5 style={{ fontFamily: "Monogram" }}>
                          Level : {monster.level} / 10;
                        </h5>
                        <h5 style={{ fontFamily: "Monogram" }}>
                          Exp : {monster.exp} / {monster.expCap};
                        </h5>
                        <h5 style={{ fontFamily: "Monogram" }}>
                          Hunger : {monster.hunger} / 100;
                        </h5>
                      </div>
                    </div>
                  </div>
                </>
              ))
            )}
            <div className="col-4 m-2" />
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
                onClick={() => deselectMonster(index)}
                style={{ position: "absolute", left: "140px", top: "0" }}
              >
                X
              </button>
              <div
                id="selected-monster-box"
                className="p-2 my-2 text-center d-flex justify-content-center align-items-center"
              >
                {monsterSelected[index] !== undefined ? monster : <h6> + </h6>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonsterSelection;
