import { useState } from "react";

import { StartActivityButton } from "@/components/Buttons/Buttons";
import startSmelting from "@/components/reactQuery/mutations/startSmelting";
import useCrystalsInventory from "@/components/reactQuery/queries/useCrystalsInventory";
import { Paragraph } from "@/components/Texts";

import CrystalsAmountControl from "./CrystalsAmountControl";

const UserCrystalsSection = () => {
  const [crystalsAmount, setCrystalsAmount] = useState(0);
  const crystalsInInventory = useCrystalsInventory({ key: "inventory" });
  const start = startSmelting({ amount: crystalsAmount });

  return (
    <div className="flex w-4/12 flex-col items-center gap-2 text-center">
      <Paragraph>Your Crystals</Paragraph>
      <CrystalsAmountControl
        amount={crystalsAmount}
        maxAmount={crystalsInInventory.data}
        setAmount={setCrystalsAmount}
      />
      <div className="flex w-full justify-center">
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
