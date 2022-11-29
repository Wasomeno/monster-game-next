import { finishDungeon, sendToDungeon } from "../../mutations/dungeonMutations";
import { StartActivityButton } from "../Buttons/Buttons";
import TimeButton from "../Buttons/TimeButton";

const DungeonConditionalButton = ({ monstersAmount, monsterSelected }) => {
  const start = sendToDungeon(monsterSelected);
  const finish = finishDungeon();

  return monstersAmount < 1 ? (
    <StartActivityButton text="Send Monsters" onClick={() => start()} />
  ) : (
    <TimeButton activity="dungeon" onClick={() => finish()} />
  );
};

export default DungeonConditionalButton;
