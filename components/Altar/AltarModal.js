import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { summonMonster } from "../../mutations/mutations";
import { summoningSides } from "../../mutations/sideffects";
import AppContext from "../../contexts/AppContext";
import { ModalTitle } from "../Texts";
import Image from "next/image";
import SummonAmountControl from "./SummonAmountControl";
import useSummonMonster from "../../mutations/summonMonster";

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
        <button
          className="bg-slate-50 rounded-md m-2 w-3/12 font-monogram p-2 text-xl"
          onClick={() => summon()}
        >
          Summon
        </button>
      </div>
    </>
  );
};

export default AltarModal;
