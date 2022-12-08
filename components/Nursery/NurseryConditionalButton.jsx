import startResting from "../../lib/mutations/Nursery/startResting";
import finishResting from "../../lib/mutations/Nursery/finishResting";
import useNurseryTime from "../../lib/queries/Nursery/useNurseryTime";
import { StartActivityButton } from "../Buttons/Buttons";
import TimeButton from "../Buttons/TimeButton";

const NurseryConditionalButton = ({ condition, duration, monsterSelected }) => {
  const nurseryTime = useNurseryTime();
  const start = startResting({
    duration: duration,
    monsters: monsterSelected,
  });
  const finish = finishResting();

  return condition ? (
    <StartActivityButton
      text="Send Monsters"
      onClick={() => start()}
      condition={monsterSelected < 1}
    />
  ) : (
    <TimeButton
      timeData={nurseryTime}
      onClick={() => finish()}
      width={"w-3/12"}
    />
  );
};

export default NurseryConditionalButton;
