import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import AppContext from "../../contexts/AppContext";
import { finishMission, sendToMission } from "../../mutations/mutations";
import {
  finishMissionSides,
  monstersToMissionSides,
} from "../../mutations/sideffects";
import { StartActivityButton } from "../Buttons";
import TimeButton from "../TimeButton";

const MissionsConditionalButton = ({ condition, mission, monsterSelected }) => {
  const user = useContext(AppContext).account[0];
  const sendMonstersToMission = useMutation(
    () => sendToMission(mission, monsterSelected),
    monstersToMissionSides(user)
  );
  const finishMonstersMission = useMutation(
    () => finishMission(),
    finishMissionSides(user)
  );

  return condition ? (
    <StartActivityButton
      text="Send Monsters"
      onClick={() => sendMonstersToMission.mutate()}
    />
  ) : (
    <TimeButton
      path={"mission"}
      width={"w-3/12"}
      onClick={() => finishMonstersMission.mutate()}
    />
  );
};

export default MissionsConditionalButton;
