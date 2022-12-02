import React, { useState } from "react";
import MonsterDetails from "./MonsterDetails";
import MoonLoader from "react-spinners/MoonLoader";
import { BackButton } from "../Buttons/Buttons";
import Modal from "../Modal";
import { ModalTitle, Paragraph } from "../Texts";
import MonsterCard from "./MonsterCard";
import useAllMonsters from "../../fetchers/useAllMonsters";
import { useAccount } from "wagmi";
import useToggle from "../../hooks/useToggle";

const MonstersModal = ({ showMonsters, toggleShowMonsters }) => {
  const { address: user } = useAccount();
  const { data: monsters, isError, isLoading } = useAllMonsters(user);
  const [showDetails, toggleDetails] = useToggle(false);
  const [monster, setMonster] = useState();

  return (
    <Modal show={showMonsters}>
      {!showDetails ? (
        <>
          <div className="flex justify-center items-center">
            <BackButton onClick={() => toggleShowMonsters()} />
            <div className="w-4/12">
              <ModalTitle>Your Monsters</ModalTitle>
            </div>
            <div className="col-4" />
          </div>
          <div className="flex justify-center items-center h-5/6">
            {isLoading ? (
              <MoonLoader size={50} loading={isLoading} color={"#eee"} />
            ) : monsters.length < 1 ? (
              <Paragraph>You Don't Have Any Monsters</Paragraph>
            ) : (
              <div className="grid grid-cols-10 gap-3 p-3 w-5/6 overflow-y-scroll max-h-full">
                {monsters?.map((monster, index) => (
                  <MonsterCard
                    key={index}
                    monster={monster.id}
                    toggleDetails={toggleDetails}
                    setMonster={setMonster}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <MonsterDetails
          monster={monster}
          toggleDetails={toggleDetails}
          showDetails={showDetails}
        />
      )}
    </Modal>
  );
};

export default MonstersModal;
