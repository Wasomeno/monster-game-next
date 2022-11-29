import {
  finishResting as finish,
  startResting as start,
} from "../../mutations/nurseryMutations";

import { StartActivityButton } from "../Buttons/Buttons";
import TimeButton from "../Buttons/TimeButton";

const NurseryConditionalButton = ({ condition, duration, monsterSelected }) => {
  const startResting = start({ duration: duration, monsters: monsterSelected });
  const finishResting = finish();

  return condition ? (
    <StartActivityButton text="Send Monsters" onClick={() => startResting()} />
  ) : (
    <TimeButton
      activity="nursery"
      onClick={() => finishResting()}
      width={"w-3/12"}
    />
  );
};

export default NurseryConditionalButton;
