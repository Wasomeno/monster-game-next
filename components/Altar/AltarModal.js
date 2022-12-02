import React, { useState } from "react";
import { ModalTitle } from "../Texts";
import Image from "next/image";
import SummonAmountControl from "./SummonAmountControl";
import useSummonMonster from "../../mutations/summonMonster";
import { StartActivityButton } from "../Buttons/Buttons";

const AltarModal = () => {
  const [quantity, setQuantity] = useState(1);
  const summon = useSummonMonster({ quantity: quantity });
  return (
    <>
      <ModalTitle>Monster Altar</ModalTitle>
      <div className="flex justify-center items-center">
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
