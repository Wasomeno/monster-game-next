import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { summonMonster } from "../../mutations/mutations";
import { altarModalStores } from "../../stores/modalStores";
import { summoningSides } from "../../mutations/sideffects";
import BackButton from "../BackButton";
import AppContext from "../../contexts/AppContext";
import Modal from "../Modal";
import { ModalTitle } from "../Texts";
import Image from "next/image";
import SummonAmountControl from "./SummonAmountControl";

const AltarModal = () => {
  const user = useContext(AppContext).account[0];
  const [show, toggleShow] = altarModalStores((state) => [
    state.show,
    state.toggleShow,
  ]);
  const [quantity, setQuantity] = useState(1);
  const summonMutation = useMutation(
    () => summonMonster(quantity),
    summoningSides(user)
  );

  return (
    <Modal show={show}>
      <BackButton onClick={toggleShow} />
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
          onClick={() => summonMutation.mutate()}
        >
          Summon
        </button>
      </div>
    </Modal>
  );
};

export default AltarModal;
