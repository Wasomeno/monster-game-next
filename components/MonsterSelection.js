import MoonLoader from "react-spinners/MoonLoader";
import { useAccount } from "wagmi";
import useInactiveMonsters from "../fetchers/useInactiveMonsters";
import MonsterSelectCard from "./MonsterSelectCard";
import MonsterSelectedCard from "./MonsterSelectedCard";
import { ModalTitle } from "./Texts";

const MonsterSelection = ({
  monsterSelected,
  selectMonster,
  deselectMonster,
}) => {
  const { address: user } = useAccount();
  const { data: monsters, isLoading, isError } = useInactiveMonsters(user);

  return (
    <div className="flex justify-around">
      <div className="w-8/12">
        <ModalTitle>Select Your Monsters</ModalTitle>
        <div className="flex justify-center items-start h-full w-full">
          <div className="flex flex-wrap gap-2 justify-center p-3 items-center w-10/12 overflow-scroll max-h-96">
            {isLoading && (
              <MoonLoader size={50} loading={isLoading} color="#EEEEEE" />
            )}
            {!isLoading &&
              (monsters.length < 1 ? (
                <h5 className="text-center text-white font-monogram text-xl">
                  No Monsters in Inventory
                </h5>
              ) : (
                monsters.map((monster) => (
                  <MonsterSelectCard
                    stats={monster}
                    onClick={() => selectMonster(monster.id)}
                  />
                ))
              ))}
          </div>
        </div>
      </div>
      <div className="w-auto">
        <div className="flex justify-center items-center m-2 my-4">
          <p className="text-center text-white font-monogram text-2xl tracking-wide">
            {monsterSelected.length} Monster Selected
          </p>
        </div>
        <div className="flex flex-col justify-start items-center overflow-y-scroll p-2">
          {monsterSelected.map((monster, index) => (
            <div
              key={index}
              className="p-2 gap-2 text-center flex justify-center items-start relative"
            >
              <button
                className="flex justify-center items-center w-8 h-8 p-2 rounded-full bg-red-700 absolute -top-1 -left-1 transitio duration-300 ease-in-out hover:bg-black z-40"
                onClick={() => deselectMonster(monster)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="white"
                  className="w-6 h-6 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <MonsterSelectedCard monster={monster} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonsterSelection;
