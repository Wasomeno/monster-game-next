import Image from "next/image";
import React, { useState } from "react";
import { useCrystals } from "../../fetchers/useSmelter";
import { useSmelt } from "../../mutations/smelterMutations";
import { StartActivityButton } from "../Buttons/Buttons";
import { Paragraph } from "../Texts";

const UserCrystalsSection = () => {
  const [crystalsAmount, setCrystalsAmount] = useState(0);
  const crystalsInInventory = useCrystals({ key: "inventory" });
  const startSmelt = useSmelt(crystalsAmount);

  return (
    <div className="w-4/12 text-center flex flex-col items-center gap-2">
      <Paragraph>Your Crystals</Paragraph>
      <div className="w-4/6 flex justify-center items-center my-2">
        <button className="bg-slate-50 p-1 w-8 h-8 rounded font-monogram text-xl flex justify-center items-center">
          {"<"}
        </button>
        <div className="flex justify-center items-center w-3/6">
          <Paragraph>
            {crystalsAmount} / {crystalsInInventory.data?.toString()}
          </Paragraph>
        </div>

        <button className="bg-slate-50 p-1 w-8 h-8 rounded font-monogram text-xl flex justify-center items-center">
          {">"}
        </button>
      </div>
      <div className="flex justify-center w-full">
        <StartActivityButton
          text="Smelt"
          onClick={() => startSmelt()}
          condition={crystalsAmount < 1}
          size="medium"
        />
      </div>
    </div>
  );
};

export default UserCrystalsSection;
