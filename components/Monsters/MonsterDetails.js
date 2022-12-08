import useToggle from "../../hooks/useToggle";
import { motion } from "framer-motion";
import FeedModal from "./FeedModal";
import { BackButton, StartActivityButton } from "../Buttons/Buttons";
import Image from "next/image";
import { ModalTitle } from "../Texts";
import MonsterStats from "./MonsterStats";
import useMonsterDetails from "../../lib/queries/Monsters/useMonsterDetails";

const MonsterDetails = ({ monster, toggleDetails }) => {
  const [showFeed, toggleShowFeed] = useToggle(false);
  const monsterDetails = useMonsterDetails({ monster: monster });
  return (
    <>
      <motion.div
        className="container h-2/3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      >
        <BackButton onClick={() => toggleDetails()} />
        <div className="flex justify-center">
          <ModalTitle>Monster #{monster}</ModalTitle>
        </div>
        <div className="flex justify-center">
          <div className="w-5/12 h-full">
            <div className="mx-auto w-8/12 h-80 border-4 border-slate-500 flex flex-col justify-center items-center bg-slate-700 bg-opacity-40 rounded-md">
              <div className="m-3">
                <Image
                  alt="monster-img"
                  src={"/monsters/" + (parseInt(monster) + 1) + ".png"}
                  width="200"
                  height="200"
                />
              </div>
            </div>
            <div className="flex justify-evenly w-full items-center my-2">
              <StartActivityButton
                text="Feed"
                onClick={() => toggleShowFeed()}
                size="medium"
              />
            </div>
          </div>
          <MonsterStats monsterDetails={monsterDetails} />)
        </div>
      </motion.div>
      {showFeed && (
        <FeedModal
          toggleShowFeed={toggleShowFeed}
          showFeed={showFeed}
          monster={monster}
          level={monsterDetails.data?.level}
        />
      )}
    </>
  );
};

export default MonsterDetails;
