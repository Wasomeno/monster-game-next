import React, { useEffect, useState, useContext } from "react";
import { itemsContract, usersDataContract } from "../hooks/useContract";
import { BigNumber, ethers } from "ethers";
import InventoryModal from "./InventoryModal";
import MonstersModal from "./MonstersModal";
import AppContext from "./AppContext";
import { useUserStatus } from "../hooks/useAccount";

const UserPanel = () => {
  const connection = useContext(AppContext);
  const [showInventory, setShowInventory] = useState(false);
  const [showMonsters, setShowMonsters] = useState(false);
  const [gold, setGold] = useState(0);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsHandler = itemsContract();
  const userDataHandler = usersDataContract();

  async function getUserStatus() {
    const result = await useUserStatus(connection.account[0]);
    setIsRegistered(result);
  }
  async function getGold() {
    await itemsHandler.balanceOf(connection.account[0], 0).then((golds) => {
      setGold(golds.toString());
    });
  }
  async function getUserDetails() {
    await userDataHandler
      .userDataDetails(connection.account[0])
      .then((details) => {
        setDetails(details);
        setLoading(false);
      });
  }

  function bytesToString(string) {
    return ethers.utils.parseBytes32String(string);
  }

  useEffect(() => {
    getUserDetails();
  }, [details.length]);

  return (
    <>
      <div
        id="user-frame"
        className="h-50 d-flex flex-column justify-content-top align-items-center rounded border border-2 border-light"
        style={{ background: "rgba(66, 63, 62, 0.5)" }}
      >
        <h5 id="text" className="p-1 text-white">
          {loading ? "loading....." : bytesToString(details.name)}
        </h5>
        <div
          id="user-image"
          style={
            loading
              ? { backgroundColor: "#000" }
              : {
                  backgroundImage: `url(${
                    "/profile/profile_" +
                    bytesToString(details.profile_image) +
                    ".png"
                  })`,
                }
          }
        />
        <h5 id="text" className="p-1 my-2 w-100 text-white text-center">
          Gold: {gold}
        </h5>
        <div id="user-menu" className="d-flex flex-column">
          <button
            id="user-menu-button"
            className="border border-dark p-2 px-3 rounded-pill d-flex my-1"
            onClick={() => setShowInventory(true)}
          >
            <img
              src="bag_icon.png"
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
              src="bag_icon.png"
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
  );
};

export default UserPanel;
