import { useState } from "react";
import { ModalTitle, Paragraph } from "../Texts";
import DurationControl from "./DurationControl";
import { StartActivityButton } from "../Buttons/Buttons";
import NurseryConditionalButton from "./NurseryConditionalButton";
import ActivityMonstersSection from "../ActivityMonstersSection";
import useMonstersOnNursery from "../../lib/queries/Nursery/useMonstersOnNursery";

const NurseryModal = ({ monsterSelected, toggleShowSelectMonster }) => {
  const [duration, setDuration] = useState(1);
  const monstersOnNursery = useMonstersOnNursery();
  return (
    <div className="flex w-full h-full flex-col justify-center">
      <ModalTitle>Nursery</ModalTitle>
      <div className="flex justify-center">
        <div className="w-6/12 text-center border border-light border-opacity-25 rounded-md p-3">
          <Paragraph>
            You can put your monsters to rest at the nursery. Choose for how
            long your monsters will rest (hourly) and for each hour there's a
            fee that you need to pay. Max amount of monsters that you can send
            is 6.
          </Paragraph>
        </div>
      </div>
      <div className="flex justify-center my-3">
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
      <div className="flex justify-center p-2 my-3">
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
