import Image from "next/image";
import { useRouter } from "next/router";
import { useToast } from "../stores/stores";

const MonsterSelectCard = ({ stats, onClick }) => {
  return (
    <div
      className=" h-80 p-2 border-4 border-slate-500 flex flex-col justify-center items-center bg-slate-700 bg-opacity-40 rounded-md cursor-pointer transition duration-300 ease-in-out hover:bg-slate-600"
      onClick={onClick}
    >
      <div>
        <h5 className="text-white font-monogram text-xl text-center">
          Monster #{stats.id}
        </h5>
      </div>
      <div className="m-1 p-3 flex items-center bg-slate-700 rounded">
        <Image
          src={"/monsters/" + (parseInt(stats.id) + 1) + ".png"}
          alt="monster-img"
          width="150"
          height="150"
          quality={100}
        />
      </div>

      <div className="w-full m-2 py-1">
        <div className="text-start font-monogram text-white text-lg">
          <div className="flex justify-evenly">
            <h5 className="w-5/12 text-center">Level</h5>
            <h5 className="w-5/12 text-center">{stats.level} / 10</h5>
          </div>
          <div className="flex justify-evenly">
            <h5 className="w-4/12 text-center">Exp</h5>
            <h5 className="w-5/12 text-center">
              {stats.exp} / {stats.expCap}
            </h5>
          </div>
          <div className="flex justify-evenly">
            <h5 className="w-4/12 text-center">Energy</h5>
            <h5 className="w-5/12 text-center">
              {stats.energy} / {stats.energyCap}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonsterSelectCard;
