import Image from "next/image";
import React from "react";
import { useCrystals } from "../../fetchers/useSmelter";
import { finishSmelt } from "../../mutations/smelterMutations";
import { StartActivityButton } from "../Buttons/Buttons";
import TimeButton from "../Buttons/TimeButton";
import { Paragraph } from "../Texts";

const SmeltingCrystals = () => {
  const crystalsInSmelter = useCrystals({ key: "smelter" });
  const finishSmelting = finishSmelt();
  return (
    <div className="w-4/12 text-center flex flex-col items-center justify-center gap-2">
      <Paragraph>Crystals in Smelter</Paragraph>
      <div className="flex justify-center items-center">
        <Image
          src="/items/4.png"
          width={"40"}
          height={"40"}
          alt="crystal-img"
          className="my-2"
        />
        <Paragraph>x {crystalsInSmelter.data?.toString()}</Paragraph>
      </div>
      <div className="flex justify-center w-full">
        {crystalsInSmelter.data < 1 ? (
          <StartActivityButton
            condition={crystalsInSmelter.data < 1}
            text="No crystals"
            size="medium"
          />
        ) : (
          <TimeButton
            activity="smelting"
            onClick={() => finishSmelting.mutate()}
          />
        )}
      </div>
    </div>
  );
};

export default SmeltingCrystals;
