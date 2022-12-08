import Image from "next/image";
import React from "react";

const MonsterSelectedCard = ({ monster }) => {
  return (
    <div className="w-20 h-20 border-4 border-slate-500 bg-slate-700 p-2 text-center d-flex justify-content-center rounded align-items-center">
      <Image
        src={"/monsters/" + parseInt(monster + 1) + ".png"}
        width="200"
        height="200"
        quality={100}
        className="overflow-hidden"
      />
    </div>
  );
};

export default MonsterSelectedCard;
