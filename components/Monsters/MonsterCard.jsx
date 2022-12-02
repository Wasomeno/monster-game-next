import Image from "next/image";
import React from "react";

const MonsterCard = ({ monster, toggleDetails, setMonster }) => {
  function monsterDetails(monster) {
    toggleDetails();
    setMonster(monster);
  }
  return (
    <div
      className="relative col-span-2 h-52 border-4 border-slate-500 flex flex-col justify-start items-center bg-slate-700 bg-opacity-40 rounded-md cursor-pointer transition duration-300 ease-in-out hover:bg-gray-600"
      onClick={() => monsterDetails(monster?.toString())}
    >
      <div className="w-full absolute bottom-0 p-2 bg-slate-700 rounded-br rounded-bl">
        <h5 className="font-monogram text-white text-lg text-center">
          Monster #{monster?.toString()}
        </h5>
      </div>
      <div className="m-1 p-3">
        <Image
          src={"/monsters/" + (parseInt(monster) + 1) + ".png"}
          alt="monster-img"
          width="120"
          height="120"
          quality={75}
        />
      </div>
    </div>
  );
};

export default MonsterCard;
