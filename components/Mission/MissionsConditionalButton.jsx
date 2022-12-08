import React from "react";
import finishMission from "../../lib/mutations/Mission/finishMission";
import startMission from "../../lib/mutations/Mission/startMission";
import useMissionTime from "../../lib/queries/Mission/useMissionTime";
import { StartActivityButton } from "../Buttons/Buttons";
import TimeButton from "../Buttons/TimeButton";

const MissionsConditionalButton = ({ condition, mission, monsterSelected }) => {
  const missionTime = useMissionTime(condition);
  const start = startMission({
    mission: mission,
    monstersSelected: monsterSelected,
  });
  const finish = finishMission();

  return condition ? (
    <StartActivityButton
      condition={monsterSelected < 1}
      text="Send Monsters"
      onClick={() => start()}
    />
  ) : (
    <TimeButton
      timeData={missionTime}
      width={"w-3/12"}
      onClick={() => finish()}
    />
  );
};

export default MissionsConditionalButton;
