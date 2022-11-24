import React, { useState } from "react";
import { motion } from "framer-motion";
import FeedModal from "./FeedModal";
import PotionModal from "./PotionModal";
import { BackButton } from "../Buttons";
import Image from "next/image";
import { ModalTitle } from "../Texts";
import MonsterStats from "./MonsterStats";

const MonsterDetails = ({ tokenId, setShowDetails }) => {
  const [showFeed, setShowFeed] = useState(false);
  const [showPotions, setShowPotions] = useState(false);

  return (
    <>
      <motion.div
        className="container h-2/3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      >
        <BackButton onClick={() => setShowDetails(false)} />
        <div className="flex justify-center">
          <ModalTitle>Monster #{tokenId}</ModalTitle>
        </div>
        <div className="flex justify-evenly">
          <>
            <div className="w-3/12 h-full">
              <div className="flex flex-col items-center justify-center">
                <div className="w-6/12 m-3 h-2/3">
                  <Image
                    alt="monster-img"
                    src={"/monsters/" + (parseInt(tokenId) + 1) + ".png"}
                    width="200"
                    height="300"
                  />
                </div>

                <div className="flex justify-evenly w-full items-center my-2">
                  <button
                    className="bg-slate-200 p-2 rounded-md w-5/12 font-monogram text-lg tracking-wide"
                    onClick={() => setShowFeed(true)}
                  >
                    Feed
                  </button>

                  <button
                    className="bg-slate-200 p-2 rounded-md w-5/12 font-monogram text-lg tracking-wide"
                    onClick={() => setShowPotions(true)}
                  >
                    Potion
                  </button>
                </div>
              </div>
            </div>
            <MonsterStats monster={tokenId} />
          </>
          )
        </div>
      </motion.div>
      {showFeed && (
        <FeedModal
          setShowFeed={setShowFeed}
          showFeed={showFeed}
          monster={tokenId}
        />
      )}
      {showPotions && (
        <PotionModal
          setShowPotions={setShowPotions}
          showPotions={showPotions}
          monster={tokenId}
        />
      )}
    </>
  );
};

export default MonsterDetails;
