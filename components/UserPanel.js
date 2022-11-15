import React, { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import InventoryModal from "./modals/InventoryModal";
import MonstersModal from "./modals/MonstersModal";
import AppContext from "../contexts/AppContext";
import { useQuery } from "@tanstack/react-query";
import { getGold, getUserDetails, getUserStatus } from "../fetchers/fetchers";
import RegisterModal from "./modals/RegisterModal";

const UserPanel = () => {
  const user = useContext(AppContext).account[0];
  const userStatus = useQuery(["registerStatus", user], getUserStatus(user), {
    initialData: true,
  });
  const [showInventory, setShowInventory] = useState(false);
  const [showMonsters, setShowMonsters] = useState(false);
  const gold = useQuery(["getGold", user], getGold(user));
  const userDetails = useQuery(["userDetails", user], getUserDetails(user));

  function bytesToString(string) {
    return ethers.utils.parseBytes32String(string);
  }

  return userStatus.data ? (
    <>
      <div
        id="user-frame"
        className="h-50 d-flex flex-column justify-content-top align-items-center rounded border border-2 border-light"
        style={{ background: "rgba(66, 63, 62, 0.5)" }}
      >
        <h5 id="text" className="p-1 text-white">
          {userDetails.isLoading
            ? "loading....."
            : bytesToString(userDetails.data?.name)}
        </h5>
        <div
          id="user-image"
          style={
            userDetails.isLoading
              ? { backgroundColor: "#000" }
              : {
                  backgroundImage: `url(${
                    "/profile/profile_" +
                    bytesToString(userDetails.data?.profile_image) +
                    ".png"
                  })`,
                  backgroundPosition: "center",
                }
          }
        />
        <h5 id="text" className="p-1 my-2 w-100 text-white text-center">
          Gold: {parseInt(gold.data)}
        </h5>
        <div id="user-menu" className="d-flex flex-column">
          <button
            id="user-menu-button"
            className="border border-dark p-2 px-3 rounded-pill d-flex my-1"
            onClick={() => setShowInventory(true)}
          >
            <img
              src="/icons/bag_icon.png"
              className="m-1"
              alt="inventory-icon"
              width={"18px"}
            />
            <h5 className="m-0 p-0">Inventory</h5>
          </button>
          <button
            id="user-menu-button"
            className="border border-dark p-2 px-3 rounded-pill d-flex my-1"
            onClick={() => setShowMonsters(true)}
          >
            <img
              src="/icons/bag_icon.png"
              className="m-1"
              alt="inventory-icon"
              width={"18px"}
            />
            <h5 className="m-0 p-0">Monsters</h5>
          </button>
        </div>
      </div>

      <InventoryModal
        showInventory={showInventory}
        setShowInventory={setShowInventory}
      />
      <MonstersModal
        showMonsters={showMonsters}
        setShowMonsters={setShowMonsters}
      />
    </>
  ) : (
    <RegisterModal />
  );
};

export default UserPanel;
