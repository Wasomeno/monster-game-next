import { useContext, useState } from "react";
import MonsterSelection from "../MonsterSelection";
import useMonsterSelected from "../../hooks/useMonsterSelected";
import AppContext from "../../contexts/AppContext";
import Modal from "../Modal";
import { useQuery } from "@tanstack/react-query";
import { getMonstersOnNursery } from "../../fetchers/fetchers";
import { nurseryModalStores } from "../../stores/modalStores";
import { BackButton } from "../Buttons";
import { ModalTitle, Paragraph } from "../Texts";
import DurationControl from "./DurationControl";
import { StartActivityButton } from "../Buttons";
import NurseryConditionalButton from "./NurseryConditionalButton";
import ActivityMonstersSection from "../ActivityMonstersSection";

const NurseryModal = () => {
  const user = useContext(AppContext).account[0];
  const [show, toggleShow] = nurseryModalStores((state) => [
    state.show,
    state.toggleShow,
  ]);
  const [duration, setDuration] = useState(1);
  const monstersOnNursery = useQuery(
    ["monstersOnNursery", user],
    getMonstersOnNursery(user)
  );
  const [showSelectMonster, setShowSelectMonster] = useState(false);
  const [monsterSelected, selectMonster, deselectMonster, clearMonsters] =
    useMonsterSelected();

  return (
    <Modal show={show}>
      <BackButton
        onClick={
          !showSelectMonster
            ? () => toggleShow()
            : () => setShowSelectMonster(false)
        }
      />
      {!showSelectMonster ? (
        <div className="flex w-full h-2/3 flex-col justify-center">
          <ModalTitle>Nursery</ModalTitle>
          <div className="flex justify-center">
            <div className="w-6/12 text-center border border-light border-opacity-25 rounded-md p-3">
              <Paragraph>
                You can put your monsters to rest at the nursery. Choose for how
                long your monsters will rest (hourly) and for each hour there's
                a fee that you need to pay. Max amount of monsters that you can
                send is 6.
              </Paragraph>
            </div>
          </div>
          <div className="flex justify-center my-3">
            <ActivityMonstersSection
              monsterSelected={monsterSelected}
              monstersOnActivity={monstersOnNursery.data}
            />
            <DurationControl
              monstersOnNursery={monstersOnNursery.data?.length}
              duration={duration}
              setDuration={setDuration}
            />
          </div>
          <div className="flex justify-center p-2 my-3">
            <StartActivityButton
              text="Select Monsters"
              condition={monstersOnNursery.data?.length > 0}
              onClick={() => setShowSelectMonster(true)}
            />
            <NurseryConditionalButton
              duration={duration}
              monsterSelected={monsterSelected}
              condition={monstersOnNursery.data?.length < 1}
            />
          </div>
        </div>
      ) : (
        <MonsterSelection
          monsterSelected={monsterSelected}
          selectMonster={selectMonster}
          deselectMonster={deselectMonster}
        />
      )}
    </Modal>
  );
};

export default NurseryModal;
