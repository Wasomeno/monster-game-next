import Image from "next/image";
import statuses from "./statusMap";

const MonsterCard = ({ monster, toggleDetails, setMonster }) => {
  const { image: statusImage } = statuses?.get(monster.status);
  function monsterDetails(monster) {
    toggleDetails();
    setMonster(monster);
  }

  return (
    <div
      className="relative col-span-2 h-52 border-4 border-slate-500 flex flex-col justify-start items-center bg-slate-700 bg-opacity-40 rounded-md cursor-pointer transition duration-300 ease-in-out hover:bg-gray-600"
      onClick={() => monsterDetails(parseInt(monster.id))}
    >
      <div className="w-10 h-10 p-1 rounded-full bg-slate-600 border-4 border-slate-500 flex items-center justify-center absolute -top-3 -right-3">
        <Image src={statusImage} width="30" height="30" />
      </div>
      <div className="w-full absolute bottom-0 p-2 bg-slate-700 rounded-br rounded-bl">
        <h5 className="font-monogram text-white text-lg text-center">
          Monster #{monster.id?.toString()}
        </h5>
      </div>
      <div className="m-1 p-3">
        <Image
          src={"/monsters/" + (parseInt(monster?.id) + 1) + ".png"}
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
