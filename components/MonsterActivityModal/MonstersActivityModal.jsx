import { AnimatePresence } from "framer-motion";

import useMonsterSelected from "../../hooks/useMonsterSelected";
import useToggle from "../../hooks/useToggle";
import Modal from "../Modal";
import { MonsterSelection } from "./MonsterSelectionModal";

export const MonstersActivityModal = ({ show, toggleShow, Child }) => {
  const [showSelectMonster, toggleShowSelectMonster] = useToggle(false);
  const [monsterSelected, selectMonster, deselectMonster] =
    useMonsterSelected();
  return (
    <Modal toggleShow={toggleShow} show={show}>
      {!showSelectMonster ? (
        <Child
          monsterSelected={monsterSelected}
          toggleShowSelectMonster={toggleShowSelectMonster}
        />
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
