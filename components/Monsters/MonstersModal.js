import React, { useContext, useState } from "react";
import MonsterDetails from "./MonsterDetails";
import MoonLoader from "react-spinners/MoonLoader";
import AppContext from "../../contexts/AppContext";
import { useQuery } from "@tanstack/react-query";
import { getAllMonsters } from "../../fetchers/fetchers";
import { BackButton } from "../Buttons";
import Modal from "../Modal";
import { ModalTitle } from "../Texts";
import MonsterCard from "./MonsterCard";

const MonstersModal = ({ showMonsters, setShowMonsters }) => {
  const user = useContext(AppContext).account[0];
  const monsters = useQuery(["allMonsters", user], () => getAllMonsters(user));
  const [showDetails, setShowDetails] = useState(false);
  const [tokenId, setTokenId] = useState("");

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
            {monsters.isLoading ? (
              <MoonLoader
                size={50}
                loading={monsters.isLoading}
                color={"#eee"}
              />
            ) : monsters < 1 ? (
              <h5 className="m-0" id="modal-title">
                You don't have a monster
              </h5>
            ) : (
              monsters.data?.map((monster, index) => (
                <MonsterCard
                  key={index}
                  monster={monster.id}
                  setShowDetails={setShowDetails}
                  setTokenId={setTokenId}
                />
              ))
            )}
          </div>
        </>
      ) : (
        <MonsterDetails
          tokenId={tokenId}
          setShowDetails={setShowDetails}
          setTokenId={setTokenId}
          showDetails={showDetails}
        />
      )}
    </Modal>
  );
};

export default MonstersModal;
