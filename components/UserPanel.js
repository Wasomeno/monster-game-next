import React, { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import InventoryModal from "./Inventory/InventoryModal";
import MonstersModal from "./Monsters/MonstersModal";
import AppContext from "../contexts/AppContext";
import { useQuery } from "@tanstack/react-query";
import { getGold, getUserDetails, getUserStatus } from "../fetchers/fetchers";
import RegisterModal from "./Register/RegisterModal";

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
        className="h-96 w-60 flex flex-col justify-start items-center rounded absolute z-5 left-5 top-5 shadow-sm"
        style={{ background: "rgba(66, 63, 62, 0.5)" }}
      >
        <h5 className="p-1 text-white font-monogram text-2xl tracking-wide m-1">
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
        <h5 className="p-1 m-1 text-white text-center font-monogram tracking-wide text-xl ">
          Gold: {parseInt(gold.data)}
        </h5>
        <div id="user-menu" className="flex flex-col">
          <button
            className="bg-slate-900 p-2 px-3 rounded-lg flex items-center my-1"
            onClick={() => setShowInventory(true)}
          >
            <img
              src="/icons/bag_icon.png"
              className="m-1"
              alt="inventory-icon"
              width={"18px"}
            />
            <p className="p-1 text-white font-monogram tracking-wide text-lg">
              Inventory
            </p>
          </button>
          <button
            className="bg-slate-900 p-2 px-3 rounded-lg flex items-center my-1"
            onClick={() => setShowMonsters(true)}
          >
            <img
              src="/icons/bag_icon.png"
              className="m-1"
              alt="inventory-icon"
              width={"18px"}
            />
            <h5 className="p-1 text-white font-monogram tracking-wide text-lg">
              Monsters
            </h5>
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
