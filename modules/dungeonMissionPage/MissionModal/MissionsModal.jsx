import { useState } from "react";

import { StartActivityButton } from "@/components/Buttons/Buttons";
import ActivityMonstersSection from "@/components/MonsterActivityModal/MonsterSelectionModal/ActivityMonstersSection";
import useMonstersOnMission from "@/components/reactQuery/queries/useMonstersOnMission";
import { ModalTitle, Paragraph } from "@/components/Texts";

import MissionsConditionalButton from "./MissionsConditionalButton";
import MissionSelectionControl from "./MissionSelectionControl";

export const MissionsModal = ({ monsterSelected, toggleShowSelectMonster }) => {
  const [mission, setMission] = useState(1);
  const monstersOnMission = useMonstersOnMission();
  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <ModalTitle>Missions</ModalTitle>
      </div>
      <div className="flex justify-center">
        <div className="border-light w-6/12 rounded-md border border-opacity-25 p-3 text-center">
          <Paragraph>
            Send your monsters to a mission! you can choose between beginner
            mission and intermediate mission. The rewards between beginner and
            intermediate mission will be different, the intermediate one of
            course will reward you more. But there&aposs a level 3 requirement
            for your monsters to enter the intermediate mission.
          </Paragraph>
        </div>
      </div>
      <div className="flex justify-center">
        <ActivityMonstersSection
          monsterSelected={monsterSelected}
          monstersOnActivity={monstersOnMission}
        />
        <MissionSelectionControl
          monstersAmount={monstersOnMission.data?.length}
          mission={mission}
          setMission={setMission}
        />
      </div>
      <div className="flex justify-center">
        <StartActivityButton
          text="Select Monsters"
          condition={monstersOnMission.data?.length > 0}
          onClick={() => toggleShowSelectMonster()}
          loading={monstersOnMission.isLoading}
        />
        <MissionsConditionalButton
          condition={monstersOnMission.data?.length < 1}
          mission={mission}
          monsterSelected={monsterSelected}
        />
      </div>
    </div>
  );
};
