import MoonLoader from "react-spinners/MoonLoader";
import { useAccount } from "wagmi";

import useInactiveMonsters from "@/components/reactQuery/queries/useInactiveMonsters";

import { ModalTitle, Paragraph } from "../../Texts";
import MonsterSelectCard from "./MonsterSelectCard";
import MonsterSelectedCard from "./MonsterSelectedCard";
import LoadingSpinner from "@/components/LoadingSpinner";

export const MonsterSelection = ({
  monsterSelected,
  selectMonster,
  deselectMonster,
}) => {
  const { address: user } = useAccount();
  const { data: monsters, isLoading, isError } = useInactiveMonsters(user);

  return (
    <div className="flex h-full justify-around">
      <div className="w-8/12">
        <ModalTitle>Select Your Monsters</ModalTitle>
        <div className="relative flex h-5/6 w-full items-start justify-center">
          {isLoading ? (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <LoadingSpinner />
            </div>
          ) : monsters.length < 1 ? (
            <Paragraph>No Monsters in Inventory</Paragraph>
          ) : (
            <div className="grid max-h-full w-10/12 grid-cols-3 gap-3 overflow-y-scroll">
              {monsters.map((monster) => (
                <MonsterSelectCard
                  stats={monster}
                  onClick={() => selectMonster(monster.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-auto">
        <div className="m-2 my-4 flex items-center justify-center">
          <p className="font-monogram text-center text-2xl tracking-wide text-white">
            {monsterSelected.length} Monster Selected
          </p>
        </div>
        <div className="flex flex-col items-center justify-start overflow-y-scroll p-2">
          {monsterSelected.map((monster, index) => (
            <div
              key={index}
              className="relative flex items-start justify-center gap-2 p-2 text-center"
            >
              <button
                className="transitio absolute -top-1 -left-1 z-40 flex h-8 w-8 items-center justify-center rounded-full bg-red-700 p-2 duration-300 ease-in-out hover:bg-black"
                onClick={() => deselectMonster(monster)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="white"
                  className="h-6 w-6 "
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
