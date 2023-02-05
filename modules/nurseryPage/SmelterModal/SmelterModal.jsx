import Image from "next/image";
import React from "react";

import { ModalTitle, Paragraph } from "@/components/Texts";

import SmeltingCrystals from "./components/SmeltingCrystals";
import UserCrystalsSection from "./components/UserCrystalsSection";

const SmelterModal = () => {
  return (
    <>
      <div className="flex items-center justify-center text-center">
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
      <div className="my-3 flex items-center justify-center">
        <UserCrystalsSection />
        <div className="w-2/12 text-center">
          <Image
            src="/icons/back_icon.png"
            width={"40"}
            height={"30"}
            alt="arrow-icon"
            className="rotate-180"
          />
        </div>
        <SmeltingCrystals />
      </div>
    </>
  );
};

export default SmelterModal;
