import React from "react";
import MonsterSelectedCard from "../MonsterSelectedCard";

const DungeonMonstersSection = ({ monstersOnDungeon, monsterSelected }) => {
  return (
    <div className="p-3 w-6/12 flex gap-2 justify-center items-center  border-white border-2 rounded-md">
      {monstersOnDungeon.length < 1 ? (
        monsterSelected.length !== 0 ? (
          monsterSelected.map((monster, index) => (
            <MonsterSelectedCard key={index} monster={monster} />
          ))
        ) : (
          <h5 id="modal-title">No Monsters Selected</h5>
        )
      ) : (
        monstersOnDungeon.map((monster, index) => (
          <MonsterSelectedCard key={index} monster={monster} />
        ))
      )}
    </div>
  );
};

export default DungeonMonstersSection;
