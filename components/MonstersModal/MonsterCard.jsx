import Image from "next/image";

import statuses from "./statusMap";

const MonsterCard = ({ monster, toggleDetails, setMonster }) => {
  const { image: statusImage } = statuses?.get(monster.status);
  return (
    <div
      className="relative col-span-2 flex h-52 cursor-pointer flex-col items-center justify-start rounded-md border-4 border-slate-500 bg-slate-700 bg-opacity-40 transition duration-300 ease-in-out hover:bg-gray-600"
      onClick={() => {
        toggleDetails();
        setMonster(parseInt(monster.id));
      }}
    >
      <div className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full border-4 border-slate-500 bg-slate-600 p-1">
        <Image src={statusImage} width="30" height="30" />
      </div>
      <div className="absolute bottom-0 w-full rounded-br rounded-bl bg-slate-700 p-2">
        <h5 className="font-monogram text-center text-lg text-white">
          Monster #{monster.id?.toString()}
        </h5>
      </div>
      <div className="relative m-1 h-36 w-20 p-3">
        <Image
          src={"/monsters/" + (parseInt(monster?.id) + 1) + ".png"}
          alt="monster-img"
          fill
          quality={75}
        />
      </div>
    </div>
  );
};

export default MonsterCard;
