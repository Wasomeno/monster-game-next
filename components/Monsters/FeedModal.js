import React, { useState } from "react";
import { motion } from "framer-motion";
import { StartActivityButton } from "../Buttons/Buttons";
import useItemAmount from "../../fetchers/useItemAmount";
import { ModalTitle, Paragraph } from "../Texts";
import Image from "next/image";
import FeedAmountControl from "./FeedAmountControl";
import feedMonster, { useEnergyPotion } from "../../mutations/feedMonster";

const FeedModal = ({ showFeed, toggleShowFeed, monster, level }) => {
  const [amount, setAmount] = useState(1);
  const energyPotion = useItemAmount({ item: 2 });
  const feed = feedMonster({ amount: amount, level: level, monster: monster });
  const drinkEnergyPotion = useEnergyPotion({ monster: monster });

  if (!showFeed) return;
  return (
    <>
      <motion.div
        className="h-full w-full bg-slate-700 bg-opacity-75 absolute top-0 left-0 rounded-md"
        onClick={() => toggleShowFeed()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      />
      <motion.div
        className="w-1/2 h-72 bg-slate-900 rounded-md absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      >
        <div className="h-1/6 flex justify-center items-center">
          <ModalTitle>Feed Monsters</ModalTitle>
        </div>
        <div className="w-full h-4/6 flex justify-center items-center">
          <div className="w-1/2 text-center h-full flex flex-col gap-2 items-center justify-center">
            <Paragraph>Pay to Feed</Paragraph>
            <FeedAmountControl amount={amount} setAmount={setAmount} />
            <StartActivityButton
              text="Feed"
              onClick={() => feed()}
              size="medium"
            />
          </div>
          <div className="w-1/2 text-center h-full flex flex-col gap-2 items-center justify-center">
            <Paragraph>Use Potion</Paragraph>
            <div className="h-8 flex gap-2 justify-center items-center">
              <Image
                src="/items/2.png"
                width="40"
                height="40"
                alt="potion-img"
              />
              <Paragraph>x {energyPotion.data?.toString()}</Paragraph>
            </div>
            <StartActivityButton
              text={"Use Potion"}
              onClick={() => drinkEnergyPotion()}
              size="medium"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FeedModal;
