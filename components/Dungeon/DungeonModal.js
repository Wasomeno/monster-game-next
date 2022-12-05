import { ModalTitle, Paragraph } from "../Texts";
import { StartActivityButton } from "../Buttons/Buttons";
import DungeonConditionalButton from "./DungeonConditionalButton";
import ActivityMonstersSection from "../ActivityMonstersSection";
import useMonstersOnActivity from "../../fetchers/useMonstersOnActivity";

const DungeonModal = ({ monsterSelected, toggleShowSelectMonster }) => {
  const monstersOnDungeon = useMonstersOnActivity("dungeon");
  return (
    <>
      <div className="flex justify-center">
        <ModalTitle>Dungeon</ModalTitle>
      </div>
      <div className="flex justify-center">
        <div className="w-6/12 text-center border-2 border-white border-opacity-25 rounded-md p-3">
          <Paragraph>
            Send your monsters to fight bosses in the dungeon.Dungeon will give
            better rewards than the missions. There's a percentage of what
            reward that you can get based on the level of your monster. So no
            level requirement but the higher the level of a monster will
            increase the chances of getting better rewards.
          </Paragraph>
        </div>
      </div>
      <div className="flex justify-center my-3">
        <ActivityMonstersSection
          monsterSelected={monsterSelected}
          monstersOnActivity={monstersOnDungeon}
        />
      </div>
      <div className="flex justify-center p-2 my-3">
        <StartActivityButton
          text={"Select Monsters"}
          condition={monstersOnDungeon.data?.length > 0}
          onClick={() => toggleShowSelectMonster()}
        />
        <DungeonConditionalButton
          monsterSelected={monsterSelected}
          monstersAmount={monstersOnDungeon.data?.length}
        />
      </div>
    </>
  );
};

export default DungeonModal;
