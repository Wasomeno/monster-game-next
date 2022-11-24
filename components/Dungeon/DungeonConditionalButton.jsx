import { useMutation } from "@tanstack/react-query";
import React from "react";
import { finishDungeon, sendToDungeon } from "../../mutations/mutations";
import {
  finishDungeonSides,
  monstersToDungeonsSides,
} from "../../mutations/sideffects";
import { StartActivityButton } from "../Buttons";
import TimeButton from "../TimeButton";

const DungeonConditionalButton = ({ monstersAmount, monsterSelected }) => {
  const startDungeonMutation = useMutation(
    () => sendToDungeon(monsterSelected),
    monstersToDungeonsSides()
  );
  const finishDungeonMutation = useMutation(
    () => finishDungeon(),
    finishDungeonSides()
  );

  return monstersAmount < 1 ? (
    <StartActivityButton
      text="Send Monsters"
      onClick={() => startDungeonMutation.mutate()}
    />
  ) : (
    <TimeButton
      path={"dungeon"}
      onClick={() => finishDungeonMutation.mutate()}
    />
  );
};

export default DungeonConditionalButton;
