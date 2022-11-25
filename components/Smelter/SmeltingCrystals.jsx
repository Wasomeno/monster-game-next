import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { getCrystalsInSmelter } from "../../fetchers/fetchers";
import { finishSmelt } from "../../mutations/mutations";
import TimeButton from "../TimeButton";

const SmeltingCrystals = ({ user }) => {
  const crystalsInSmelter = useQuery(
    ["cyrstalsInSmelter", user],
    getCrystalsInSmelter(user)
  );
  const finishSmelting = useMutation(() => finishSmelt());

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
      <TimeButton path={"smelter"} onClick={() => finishSmelting.mutate()} />
    </div>
  );
};

export default SmeltingCrystals;
