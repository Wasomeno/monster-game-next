import Image from "next/image";
import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

import { StartActivityButton } from "@/components/Buttons/Buttons";
import TimeButton from "@/components/Buttons/TimeButton";
import finishSmelting from "@/components/reactQuery/mutations/finishSmelting";
import useCrystalsInSmelter from "@/components/reactQuery/queries/useCrystalsSmelter";
import useSmeltingTime from "@/components/reactQuery/queries/useSmeltingTime";
import { Paragraph } from "@/components/Texts";

const SmeltingCrystals = () => {
  const { data: crystalsInSmelter, isFetching } = useCrystalsInSmelter();
  const smeltingTime = useSmeltingTime();
  const finish = finishSmelting();
  return (
    <div className="flex w-4/12 flex-col items-center justify-center gap-2 text-center">
      <Paragraph>Crystals in Smelter</Paragraph>
      <div className="flex items-center justify-center">
        {isFetching ? (
          <MoonLoader loading={isFetching} size={20} color="white" />
        ) : (
          <>
            <Image
              src="/items/4.png"
              width={"40"}
              height={"40"}
              alt="crystal-img"
              className="my-2"
            />
            <Paragraph>x {crystalsInSmelter.quantity?.toString()}</Paragraph>
          </>
        )}
      </div>

      <div className="flex w-full justify-center">
        {parseInt(crystalsInSmelter?.quantity) < 1 ? (
          <StartActivityButton
            condition={parseInt(crystalsInSmelter?.quantity) < 1}
            text="No crystals"
            size="medium"
            loading={isFetching}
          />
        ) : (
          <TimeButton timeData={smeltingTime} onClick={() => finish()} />
        )}
      </div>
    </div>
  );
};

export default SmeltingCrystals;
