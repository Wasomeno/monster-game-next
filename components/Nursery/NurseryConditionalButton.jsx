import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import AppContext from "../../contexts/AppContext";
import { finishResting, startResting } from "../../mutations/mutations";
import {
  finishRestingSides,
  startRestingSides,
} from "../../mutations/sideffects";
import { StartActivityButton } from "../Buttons";
import TimeButton from "../TimeButton";

const NurseryConditionalButton = ({ condition, duration, monsterSelected }) => {
  const user = useContext(AppContext).account[0];
  const sendMonstersToNursery = useMutation(
    () => startResting(duration, monsterSelected),
    startRestingSides()
  );

  const bringBackFromNursery = useMutation(
    () => finishResting(),
    finishRestingSides(user)
  );

  return condition ? (
    <StartActivityButton
      text="Send Monsters"
      onClick={() => sendMonstersToNursery.mutate()}
    />
  ) : (
    <TimeButton
      path={"nursery"}
      onClick={() => bringBackFromNursery.mutate()}
      width={"w-3/12"}
    />
  );
};

export default NurseryConditionalButton;
