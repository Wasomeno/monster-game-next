import { StartActivityButton } from "@/components/Buttons/Buttons";
import TimeButton from "@/components/Buttons/TimeButton";
import finishResting from "@/components/reactQuery/mutations/finishResting";
import startResting from "@/components/reactQuery/mutations/startResting";
import useNurseryTime from "@/components/reactQuery/queries/useNurseryTime";

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
