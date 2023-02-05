import { useState } from "react";

import ActivityMonstersSection from "@/components/ActivityMonstersSection";
import { StartActivityButton } from "@/components/Buttons/Buttons";
import useMonstersOnNursery from "@/components/reactQuery/queries/useMonstersOnNursery";
import { ModalTitle, Paragraph } from "@/components/Texts";

import DurationControl from "./components/DurationControl";
import NurseryConditionalButton from "./components/NurseryConditionalButton";

const NurseryModal = ({ monsterSelected, toggleShowSelectMonster }) => {
  const [duration, setDuration] = useState(1);
  const monstersOnNursery = useMonstersOnNursery();
  return (
    <div className="flex h-full w-full flex-col justify-center">
      <ModalTitle>Nursery</ModalTitle>
      <div className="flex justify-center">
        <div className="border-light w-6/12 rounded-md border border-opacity-25 p-3 text-center">
          <Paragraph>
            You can put your monsters to rest at the nursery. Choose for how
            long your monsters will rest (hourly) and for each hour there&aposs
            a fee that you need to pay. Max amount of monsters that you can send
            is 6.
          </Paragraph>
        </div>
      </div>
      <div className="my-3 flex justify-center">
        <ActivityMonstersSection
          monsterSelected={monsterSelected}
          monstersOnActivity={monstersOnNursery}
        />
        <DurationControl
          monstersOnNursery={monstersOnNursery.data?.length}
          duration={duration}
          setDuration={setDuration}
        />
      </div>
      <div className="my-3 flex justify-center p-2">
        <StartActivityButton
          text="Select Monsters"
          condition={monstersOnNursery.data?.length > 0}
          onClick={() => toggleShowSelectMonster()}
        />
        <NurseryConditionalButton
          duration={duration}
          monsterSelected={monsterSelected}
          condition={monstersOnNursery.data?.length < 1}
        />
      </div>
    </div>
  );
};

export default NurseryModal;
