import startDungeon from "../../lib/mutations/Dungeon/startDungeon";
import finishDungeon from "../../lib/mutations/Dungeon/finishDungeon";
import useDungeonTime from "../../lib/queries/Dungeon/useDungeonTime";
import { StartActivityButton } from "../Buttons/Buttons";
import TimeButton from "../Buttons/TimeButton";

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
