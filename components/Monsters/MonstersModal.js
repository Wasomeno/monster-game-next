import React, { useState } from "react";
import MonsterDetails from "./MonsterDetails";
import MoonLoader from "react-spinners/MoonLoader";
import { BackButton } from "../Buttons/Buttons";
import Modal from "../Modal";
import { ModalTitle } from "../Texts";
import MonsterCard from "./MonsterCard";
import useAllMonsters from "../../fetchers/useAllMonsters";
import { useAccount } from "wagmi";
import useToggle from "../../hooks/useToggle";

const MonstersModal = ({ showMonsters, setShowMonsters }) => {
  const { address: user } = useAccount();
  const { data: monsters, isError, isLoading } = useAllMonsters(user);
  const [showDetails, toggleDetails] = useToggle(false);

  return (
    <Modal show={showMonsters}>
      {!showDetails ? (
        <>
          <div className="flex justify-center items-center">
            <BackButton onClick={() => setShowMonsters(false)} />
            <div className="w-4/12">
              <ModalTitle>Your Monsters</ModalTitle>
            </div>
            <div className="col-4" />
          </div>
          <div className="flex justify-center items-end flex-wrap p-3 overflow-y-scroll">
            {isLoading ? (
              <MoonLoader size={50} loading={isLoading} color={"#eee"} />
            ) : monsters < 1 ? (
              <h5 className="m-0" id="modal-title">
                You don't have a monster
              </h5>
            ) : (
              monsters?.map((monster, index) => (
                <MonsterCard
                  key={index}
                  monster={monster.id}
                  toggleDetails={toggleDetails}
                  setTokenId={setTokenId}
                />
              ))
            )}
          </div>
        </>
      ) : (
        <MonsterDetails
          tokenId={tokenId}
          toggleDetails={toggleDetails}
          setTokenId={setTokenId}
          showDetails={showDetails}
        />
      )}
    </Modal>
  );
};

export default MonstersModal;
