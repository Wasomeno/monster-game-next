import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

import { StartActivityButton } from "@/components/Buttons/Buttons";
import feedMonster from "@/components/reactQuery/mutations/feedMonster";
import useEnergyPotion from "@/components/reactQuery/mutations/useEnergyPotion";
import useItemAmount from "@/components/reactQuery/queries/useItemAmount";
import { ModalTitle, Paragraph } from "@/components/Texts";

import FeedAmountControl from "./FeedAmountControl";

export const FeedModal = ({ showFeed, toggleShowFeed, monster, level }) => {
  const [amount, setAmount] = useState(1);
  const energyPotion = useItemAmount({ item: 2 });
  const feed = feedMonster({ amount: amount, level: level, monster: monster });
  const usePotion = useEnergyPotion({ monster: monster });

  if (!showFeed) return;
  return (
    <>
      <motion.div
        className="absolute top-0 left-0 h-full w-full rounded-md bg-slate-700 bg-opacity-75"
        onClick={() => toggleShowFeed()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 z-50 h-72 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-slate-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      >
        <div className="flex h-1/6 items-center justify-center">
          <ModalTitle>Feed Monsters</ModalTitle>
        </div>
        <div className="flex h-4/6 w-full items-center justify-center">
          <div className="flex h-full w-1/2 flex-col items-center justify-center gap-2 text-center">
            <Paragraph>Pay to Feed</Paragraph>
            <FeedAmountControl amount={amount} setAmount={setAmount} />
            <StartActivityButton
              text="Feed"
              onClick={() => feed()}
              size="medium"
            />
          </div>
          <div className="flex h-full w-1/2 flex-col items-center justify-center gap-2 text-center">
            <Paragraph>Use Potion</Paragraph>
            <div className="flex h-8 items-center justify-center gap-2">
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
              onClick={() => usePotion()}
              size="medium"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};
