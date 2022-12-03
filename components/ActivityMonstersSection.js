import React from "react";
import MonsterSelectedCard from "./MonsterSelectedCard";
import MoonLoader from "react-spinners/MoonLoader";
import { Paragraph } from "./Texts";

const ActivityMonstersSection = ({ monsterSelected, monstersOnActivity }) => {
  const { data: monsters, isLoading, isError } = monstersOnActivity;
  return (
    <div className="p-3 mx-2 w-6/12 h-28 flex gap-2 justify-center items-center border border-light border-opacity-25 rounded-md">
      {isLoading ? (
        <MoonLoader loading={isLoading} color="white" size={20} />
      ) : monsters.length < 1 ? (
        monsterSelected?.length !== 0 ? (
          monsterSelected.map((monster, index) => (
            <MonsterSelectedCard key={index} monster={monster} />
          ))
        ) : (
          <Paragraph>No Monster Selected</Paragraph>
        )
      ) : (
        monsters.map((monster, index) => (
          <MonsterSelectedCard key={index} monster={parseInt(monster)} />
        ))
      )}
    </div>
  );
};

export default ActivityMonstersSection;
