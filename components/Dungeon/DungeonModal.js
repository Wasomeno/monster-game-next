import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MonsterSelection from "../MonsterSelection";
import AppContext from "../../contexts/AppContext";
import useMonsterSelected from "../../hooks/useMonsterSelected";
import { getDungeonTime, getMonstersOnDungeon } from "../../fetchers/fetchers";
import { dungeonModalStores } from "../../stores/modalStores";
import { BackButton } from "../Buttons";
import Modal from "../Modal";
import { ModalTitle, Paragraph } from "../Texts";
import { StartActivityButton } from "../Buttons";
import DungeonConditionalButton from "./DungeonConditionalButton";
import ActivityMonstersSection from "../ActivityMonstersSection";

const DungeonModal = () => {
  const [show, toggleShow] = dungeonModalStores((state) => [
    state.show,
    state.toggleShow,
  ]);
  const [showDungeonSelect, setShowDungeonSelect] = useState(false);
  const user = useContext(AppContext).account[0];
  const monstersOnDungeon = useQuery(
    ["monstersOnDungeon", user],
    getMonstersOnDungeon(user)
  );
  const dungeonTime = useQuery(["dungeonTime", user], () =>
    getDungeonTime(user)
  );
  const [monsterSelected, selectMonster, deselectMonster, clearMonsters] =
    useMonsterSelected();

  return (
    <Modal show={show}>
      <BackButton
        onClick={
          showDungeonSelect ? () => setShowDungeonSelect(false) : toggleShow
        }
      />
      {showDungeonSelect ? (
        <MonsterSelection
          monsterSelected={monsterSelected}
          selectMonster={selectMonster}
          deselectMonster={deselectMonster}
        />
      ) : (
        <>
          <div className="flex justify-center">
            <ModalTitle>Dungeon</ModalTitle>
          </div>
          <div className="flex justify-center">
            <div className="w-6/12 text-center border-2 border-white border-opacity-25 rounded-md">
              <Paragraph>
                Send your monsters to fight bosses in the dungeon.Dungeon will
                give better rewards than the missions. There's a percentage of
                what reward that you can get based on the level of your monster.
                So no level requirement but the higher the level of a monster
                will increase the chances of getting better rewards.
              </Paragraph>
            </div>
          </div>
          <div className="flex justify-center my-3">
            <ActivityMonstersSection
              monsterSelected={monsterSelected}
              monstersOnActivity={monstersOnDungeon.data}
            />
          </div>
          <div className="flex justify-center p-2 my-3">
            <StartActivityButton
              text={"Select Monsters"}
              condition={dungeonTime.data >= 0 ? false : true}
              onClick={() => setShowDungeonSelect(true)}
            />
            <DungeonConditionalButton
              monsterSelected={monsterSelected}
              monstersAmount={monstersOnDungeon.data?.length}
            />
          </div>
        </>
      )}
    </Modal>
  );
};

export default DungeonModal;
