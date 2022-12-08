import Image from "next/image";
import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import useCrystalsInSmelter from "../../lib/queries/Smelter/useCrystalsSmelter";
import useSmeltingTime from "../../lib/queries/Smelter/useSmeltingTime";
import finishSmelting from "../../lib/mutations/Smelter/finishSmelting";
import { StartActivityButton } from "../Buttons/Buttons";
import TimeButton from "../Buttons/TimeButton";
import { Paragraph } from "../Texts";

const SmeltingCrystals = () => {
  const { data: crystalsInSmelter, isFetching } = useCrystalsInSmelter();
  const smeltingTime = useSmeltingTime();
  const finish = finishSmelting();
  return (
    <div className="w-4/12 text-center flex flex-col items-center justify-center gap-2">
      <Paragraph>Crystals in Smelter</Paragraph>
      <div className="flex justify-center items-center">
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

      <div className="flex justify-center w-full">
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
