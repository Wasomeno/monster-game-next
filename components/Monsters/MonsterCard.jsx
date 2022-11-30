import Image from "next/image";
import React from "react";
import { Paragraph } from "../Texts";

const MonsterCard = ({ monster, toggleDetails, setMonster }) => {
  function monsterDetails(monster) {
    toggleDetails();
    setMonster(monster);
  }
  return (
    <div
      className="w-2/12 m-1 bg-slate-600 bg-opacity-40 rounded-md p-3 shadow-sm flex flex-col justify-center items-center transition duration-300 ease-in-out cursor-pointer hover:bg-slate-600 "
      onClick={() => monsterDetails(monster.toString())}
    >
      <Image
        src={"/monsters/" + (parseInt(monster) + 1) + ".png"}
        alt="monster-img"
        width={"120px"}
        height={"120px"}
        quality={100}
      />
      <div className="text-center m-2">
        <Paragraph>Monster #{monster.toString()}</Paragraph>
      </div>
    </div>
  );
};

export default MonsterCard;
