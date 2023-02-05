import React, { useState } from "react";

import { BackButton } from "@/components/Buttons/Buttons";
import useAllMonsters from "@/components/reactQuery/queries/useAllMonsters";
import { ModalTitle, Paragraph } from "@/components/Texts";

import useToggle from "../../hooks/useToggle";
import LoadingSpinner from "../LoadingSpinner";
import Modal from "../Modal";
import MonsterCard from "./MonsterCard";
import MonsterDetails from "./MonsterDetails";

export const MonstersModal = ({ showMonsters, toggleShowMonsters }) => {
  const { data: monsters, isError, isLoading } = useAllMonsters();
  const [showDetails, toggleDetails] = useToggle(false);
  const [monster, setMonster] = useState();

  return (
    <Modal toggleShow={toggleShowMonsters} show={showMonsters}>
      <div className="flex items-center justify-center">
        <BackButton onClick={() => toggleShowMonsters()} />
        <div className="w-4/12">
          <ModalTitle>Your Monsters</ModalTitle>
        </div>
        <div className="col-4" />
      </div>
      <div className="relative flex h-5/6 items-start justify-center">
        {isLoading ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <LoadingSpinner />
          </div>
        ) : monsters.length < 1 ? (
          <Paragraph>You Don't Have Any Monsters</Paragraph>
        ) : (
          <div className="w- grid max-h-full w-5/6 grid-cols-10 gap-3 overflow-y-scroll p-3">
            {monsters?.map((monster, index) => (
              <MonsterCard
                key={index}
                monster={monster}
                toggleDetails={toggleDetails}
                setMonster={setMonster}
              />
            ))}
          </div>
        )}
      </div>
      {showDetails && (
        <MonsterDetails
          monster={monster}
          toggleDetails={toggleDetails}
          showDetails={showDetails}
        />
      )}
    </Modal>
  );
};
