import React from "react";
import { ModalTitle, Paragraph } from "../Texts";
import Image from "next/image";
import UserCrystalsSection from "./UserCrystalsSection";
import SmeltingCrystals from "./SmeltingCrystals";

const SmelterModal = () => {
  return (
    <>
      <div className="flex justify-center items-center text-center">
        <ModalTitle>Smelter</ModalTitle>
      </div>
      <div className="flex justify-center">
        <div className="w-6/12 text-center border-2 border-slate-50 p-2 rounded">
          <Paragraph>
            You can smelt your Crystals that you got from dungeon to Monster
            Token. You get 5 Monster Token for every single Crystals that you
            smelted.
          </Paragraph>
        </div>
      </div>
      <div className="flex justify-center items-center my-3">
        <UserCrystalsSection user={user} />
        <div className="w-2/12 text-center">
          <Image
            src="/icons/back_icon.png"
            width={"40"}
            height={"30"}
            alt="arrow-icon"
            className="rotate-180"
          />
        </div>
        <SmeltingCrystals user={user} />
      </div>
    </>
  );
};

export default SmelterModal;
