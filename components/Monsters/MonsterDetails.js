import useToggle from "../../hooks/useToggle";
import { motion } from "framer-motion";
import FeedModal from "./FeedModal";
import { BackButton, StartActivityButton } from "../Buttons/Buttons";
import Image from "next/image";
import { ModalTitle } from "../Texts";
import MonsterStats from "./MonsterStats";

const MonsterDetails = ({ monster, toggleDetails }) => {
  const [showFeed, toggleShowFeed] = useToggle(false);
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
        <div className="flex justify-evenly">
          <>
            <div className="w-3/12 h-full">
              <div className="flex flex-col items-center justify-center">
                <div className="w-6/12 m-3 h-2/3">
                  <Image
                    alt="monster-img"
                    src={"/monsters/" + (parseInt(monster) + 1) + ".png"}
                    width="200"
                    height="300"
                  />
                </div>

                <div className="flex justify-evenly w-full items-center my-2">
                  <StartActivityButton
                    text="Feed"
                    onClick={() => toggleShowFeed()}
                    size="medium"
                  />
                </div>
              </div>
            </div>
            <MonsterStats monster={monster} />
          </>
          )
        </div>
      </motion.div>
      {showFeed && (
        <FeedModal
          toggleShowFeed={toggleShowFeed}
          showFeed={showFeed}
          monster={monster}
        />
      )}
    </>
  );
};

export default MonsterDetails;
