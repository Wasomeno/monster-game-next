import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

import { Paragraph } from "../../Texts";
import MonsterSelectedCard from "./MonsterSelectedCard";

const ActivityMonstersSection = ({ monsterSelected, monstersOnActivity }) => {
  const { data: monsters, isFetching, isError } = monstersOnActivity;
  return (
    <div className="border-light mx-2 flex h-28 w-6/12 items-center justify-center gap-2 rounded-md border border-opacity-25 p-3">
      {isFetching ? (
        <MoonLoader loading={isFetching} color="white" size={20} />
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
