import Image from "next/image";
import React from "react";

import { ModalTitle, Paragraph } from "@/components/Texts";

import SmeltingCrystals from "./components/SmeltingCrystals";
import UserCrystalsSection from "./components/UserCrystalsSection";

export const SmelterModal = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <ModalTitle>Smelter</ModalTitle>
      </div>
      <div className="flex justify-center">
        <div className="w-6/12 rounded border-2 border-slate-50 p-2 text-center">
          <Paragraph>
            You can smelt your Crystals that you got from dungeon to Monster
            Token. You get 5 Monster Token for every single Crystals that you
            smelted.
          </Paragraph>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <UserCrystalsSection />
        <div className="relative text-center">
          <Image
            src="/icons/back_icon.png"
            width={"40"}
            height={"30"}
            alt="arrow-icon"
          />
        </div>
        <SmeltingCrystals />
      </div>
    </div>
  );
};
