import Image from "next/image";
import React, { useState } from "react";
import useCrystalsInventory from "../../lib/queries/Smelter/useCrystalsInventory";
import startSmelting from "../../lib/mutations/Smelter/startSmelting";
import { StartActivityButton } from "../Buttons/Buttons";
import { Paragraph } from "../Texts";
import CrystalsAmountControl from "./CrystalsAmountControl";

const UserCrystalsSection = () => {
  const [crystalsAmount, setCrystalsAmount] = useState(0);
  const crystalsInInventory = useCrystalsInventory({ key: "inventory" });
  const start = startSmelting({ amount: crystalsAmount });

  return (
    <div className="w-4/12 text-center flex flex-col items-center gap-2">
      <Paragraph>Your Crystals</Paragraph>
      <CrystalsAmountControl
        amount={crystalsAmount}
        maxAmount={crystalsInInventory.data}
        setAmount={setCrystalsAmount}
      />
      <div className="flex justify-center w-full">
        <StartActivityButton
          text="Smelt"
          onClick={() => start()}
          condition={crystalsAmount < 1}
          size="medium"
        />
      </div>
    </div>
  );
};

export default UserCrystalsSection;
