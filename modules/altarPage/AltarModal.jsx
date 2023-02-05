import Image from "next/image";
import React, { useState } from "react";

import { StartActivityButton } from "@/components/Buttons/Buttons";
import summonMonster from "@/components/reactQuery/mutations/summonMonster";
import { ModalTitle } from "@/components/Texts";

import SummonAmountControl from "./SummonAmountControl";

const AltarModal = () => {
  const [quantity, setQuantity] = useState(1);
  const summon = summonMonster({ quantity: quantity });
  return (
    <>
      <ModalTitle>Monster Altar</ModalTitle>
      <div className="flex items-center justify-center">
        <Image
          src="/ui/summoning-altar.png"
          alt="altar-icon"
          width="400"
          height="300"
          quality="100"
        />
      </div>
      <SummonAmountControl amount={quantity} setAmount={setQuantity} />
      <div className="flex justify-center">
        <StartActivityButton text="Summon" onClick={() => summon()} />
      </div>
    </>
  );
};

export default AltarModal;
