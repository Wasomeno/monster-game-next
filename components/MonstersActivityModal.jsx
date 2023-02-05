import { AnimatePresence, motion } from "framer-motion";
import useMonsterSelected from "../hooks/useMonsterSelected";
import useToggle from "../hooks/useToggle";
import { BackButton } from "./Buttons/Buttons";
import MonsterSelection from "./MonsterSelection";

const MonstersActivityModal = ({ show, toggleShow, Child }) => {
  const [showSelectMonster, toggleShowSelectMonster] = useToggle(false);
  const [monsterSelected, selectMonster, deselectMonster] =
    useMonsterSelected();
  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            className="h-screen w-screen bg-slate-800 bg-opacity-60 absolute z-10 top-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.25 }}
          />
          <motion.div
            className="modal p-3 absolute z-15 bg-slate-900 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <BackButton
              onClick={
                showSelectMonster
                  ? () => toggleShowSelectMonster()
                  : () => toggleShow()
              }
            />
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
          </motion.div>
        </>
      )}
      ;
    </AnimatePresence>
  );
};

export default MonstersActivityModal;
