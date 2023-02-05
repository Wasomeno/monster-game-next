import ActivityMonstersSection from "@/components/ActivityMonstersSection";
import { StartActivityButton } from "@/components/Buttons/Buttons";
import useMonstersOnDungeon from "@/components/reactQuery/queries/useMonstersOnDungeon";
import { ModalTitle, Paragraph } from "@/components/Texts";

import DungeonConditionalButton from "./DungeonConditionalButton";

const DungeonModal = ({ monsterSelected, toggleShowSelectMonster }) => {
  const monstersOnDungeon = useMonstersOnDungeon();
  return (
    <>
      <div className="flex justify-center">
        <ModalTitle>Dungeon</ModalTitle>
      </div>
      <div className="flex justify-center">
        <div className="w-6/12 rounded-md border-2 border-white border-opacity-25 p-3 text-center">
          <Paragraph>
            Send your monsters to fight bosses in the dungeon.Dungeon will give
            better rewards than the missions. There&aposs a percentage of what
            reward that you can get based on the level of your monster. So no
            level requirement but the higher the level of a monster will
            increase the chances of getting better rewards.
          </Paragraph>
        </div>
      </div>
      <div className="my-3 flex justify-center">
        <ActivityMonstersSection
          monsterSelected={monsterSelected}
          monstersOnActivity={monstersOnDungeon}
        />
      </div>
      <div className="my-3 flex justify-center p-2">
        <StartActivityButton
          text={"Select Monsters"}
          condition={monstersOnDungeon.data?.length > 0}
          onClick={() => toggleShowSelectMonster()}
          loading={monstersOnDungeon.isLoading}
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
