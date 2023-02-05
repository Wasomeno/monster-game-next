import { motion } from "framer-motion";
import Image from "next/image";

import useMonsterDetails from "@/components/reactQuery/queries/useMonsterDetails";

import useToggle from "../../hooks/useToggle";
import { BackButton, StartActivityButton } from "../Buttons/Buttons";
import { ModalTitle } from "../Texts";
import { FeedModal } from "./FeedModal";
import { MonsterStats } from "./MonsterStats";

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
          <div className="h-full w-5/12">
            <div className="mx-auto flex h-80 w-8/12 flex-col items-center justify-center rounded-md border-4 border-slate-500 bg-slate-700 bg-opacity-40">
              <div className="m-3">
                <Image
                  alt="monster-img"
                  src={"/monsters/" + (parseInt(monster) + 1) + ".png"}
                  width="200"
                  height="200"
                />
              </div>
            </div>
            <div className="my-2 flex w-full items-center justify-evenly">
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
