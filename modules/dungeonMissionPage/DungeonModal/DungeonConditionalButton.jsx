import { StartActivityButton } from "@/components/Buttons/Buttons";
import TimeButton from "@/components/Buttons/TimeButton";
import finishDungeon from "@/components/reactQuery/mutations/finishDungeon";
import startDungeon from "@/components/reactQuery/mutations/startDungeon";
import useDungeonTime from "@/components/reactQuery/queries/useDungeonTime";

const DungeonConditionalButton = ({ monstersAmount, monsterSelected }) => {
  const dungeonTime = useDungeonTime();
  const start = startDungeon(monsterSelected);
  const finish = finishDungeon();

  return monstersAmount < 1 ? (
    <StartActivityButton
      text="Send Monsters"
      onClick={() => start()}
      condition={monsterSelected < 1}
    />
  ) : (
    <TimeButton timeData={dungeonTime} onClick={() => finish()} />
  );
};

export default DungeonConditionalButton;
