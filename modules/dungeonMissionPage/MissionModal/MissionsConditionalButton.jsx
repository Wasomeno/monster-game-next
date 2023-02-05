import React from "react";

import { StartActivityButton } from "@/components/Buttons/Buttons";
import TimeButton from "@/components/Buttons/TimeButton";
import finishMission from "@/components/reactQuery/mutations/finishMission";
import startMission from "@/components/reactQuery/mutations/startMission";
import useMissionTime from "@/components/reactQuery/queries/useMissionTime";

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
