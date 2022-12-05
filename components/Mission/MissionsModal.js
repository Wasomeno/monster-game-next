import { useState } from "react";
import { ModalTitle, Paragraph } from "../Texts";
import MissionSelectionControl from "./MissionSelectionControl";
import { StartActivityButton } from "../Buttons/Buttons";
import MissionsConditionalButton from "./MissionsConditionalButton";
import ActivityMonstersSection from "../ActivityMonstersSection";
import useMonstersOnActivity from "../../fetchers/useMonstersOnActivity";

const MissionsModal = ({ monsterSelected, toggleShowSelectMonster }) => {
  const [mission, setMission] = useState(1);
  const monstersOnMission = useMonstersOnActivity("mission");

  return (
    <>
      <div className="flex justify-center items-center m-3">
        <div className="w-6/12">
          <ModalTitle>Missions</ModalTitle>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-6/12 text-center border border-light border-opacity-25 rounded-md p-3">
          <Paragraph>
            Send your monsters to a mission! you can choose between beginner
            mission and intermediate mission. The rewards between beginner and
            intermediate mission will be different, the intermediate one of
            course will reward you more. But there's a level 3 requirement for
            your monsters to enter the intermediate mission.
          </Paragraph>
        </div>
      </div>
      <div className="flex justify-center my-3">
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
      <div className="flex justify-center p-2 my-3">
        <StartActivityButton
          text="Select Monsters"
          condition={monstersOnMission.data?.length > 0}
          onClick={() => toggleShowSelectMonster()}
        />
        <MissionsConditionalButton
          condition={monstersOnMission.data?.length < 1}
          mission={mission}
          monsterSelected={monsterSelected}
        />
      </div>
    </>
  );
};

export default MissionsModal;
