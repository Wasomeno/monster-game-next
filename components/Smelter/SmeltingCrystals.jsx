import Image from "next/image";
import React from "react";
import { useCrystals } from "../../fetchers/useSmelter";
import { finishSmelt } from "../../mutations/smelterMutations";
import TimeButton from "../Buttons/TimeButton";

const SmeltingCrystals = () => {
  const crystalsInSmelter = useCrystals({ key: "smelter" });
  const finishSmelting = finishSmelt();
  return (
    <div className="w-4/12 text-center">
      <h5 className="m-0 text-white p-2">Crystals in Smelter</h5>
      <div className="flex justify-center items-center">
        <Image
          src="/items/4.png"
          width={"40"}
          height={"40"}
          alt="crystal-img"
          className="my-2"
        />
        <h5 className="m-0 p-2 text-white">
          x {crystalsInSmelter.data?.toString()}
        </h5>
      </div>
      <TimeButton activity="smelting" onClick={() => finishSmelting.mutate()} />
    </div>
  );
};

export default SmeltingCrystals;
