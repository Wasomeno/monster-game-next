import React from "react";
import MonsterSelectedCard from "./MonsterSelectedCard";
import { Paragraph } from "./Texts";

const ActivityMonstersSection = ({ monsterSelected, monstersOnActivity }) => {
  return (
    <div className="p-3 mx-2 w-6/12 h-28 flex gap-2 justify-center items-center border border-light border-opacity-25 rounded-md">
      {monstersOnActivity.length < 1 ? (
        monsterSelected.length !== 0 ? (
          monsterSelected.map((monster, index) => (
            <MonsterSelectedCard key={index} monster={monster} />
          ))
        ) : (
          <Paragraph>No Monster Selected</Paragraph>
        )
      ) : (
        monstersOnActivity.map((monster, index) => (
          <MonsterSelectedCard key={index} monster={parseInt(monster)} />
        ))
      )}
    </div>
  );
};

export default ActivityMonstersSection;
