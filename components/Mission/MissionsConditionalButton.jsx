import React from "react";
import {
  finishMission as finish,
  sendToMission as start,
} from "../../mutations/missionMutations";
import { StartActivityButton } from "../Buttons/Buttons";
import TimeButton from "../Buttons/TimeButton";

const MissionsConditionalButton = ({ condition, mission, monsterSelected }) => {
  const startMission = start({
    mission: mission,
    monstersSelected: monsterSelected,
  });
  const finishMission = finish();

  return condition ? (
    <StartActivityButton
      condition={monsterSelected < 1}
      text="Send Monsters"
      onClick={() => startMission()}
    />
  ) : (
    <TimeButton
      activity="mission"
      width={"w-3/12"}
      onClick={() => finishMission()}
    />
  );
};

export default MissionsConditionalButton;
