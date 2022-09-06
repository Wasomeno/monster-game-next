import React, { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import InventoryModal from "./InventoryModal";
import MonstersModal from "./MonstersModal";
import ItemsABI from "../abi/Items.json";
import AppContext from "./AppContext";

const ItemsContract = "0x633c04c362381BbD1C9B8762065318Cb4F207989";

const UserPanel = () => {
  const connection = useContext(AppContext);
  const [showInventory, setShowInventory] = useState(false);
  const [showMonsters, setShowMonsters] = useState(false);
  const [gold, setGold] = useState(0);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const itemsContract = new ethers.Contract(
    ItemsContract,
    ItemsABI.abi,
    signer
  );

  async function getGold() {
    await itemsContract.balanceOf(signer.getAddress(), 0).then((response) => {
      setGold(response.toString());
    });
  }

  useEffect(() => {
    getGold();
  }, []);

  return (
    <>
      <div
        id="user-frame"
        className="h-50 d-flex flex-column justify-content-top align-items-center rounded border border-2 border-dark"
        style={{ backgroundColor: "#D8CCA3" }}
      >
        <h5 id="modal-title" className="p-1">
          {connection.account[0]
            ? connection.account[0].slice(0, 6) +
              "..." +
              connection.account[0].slice(36, 42)
            : "Unknown"}
        </h5>
        <div
          id="user-image"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + "user-icon.png"})`,
          }}
        />
        <h6 id="modal-title" className="p-1 w-100">
          Gold: {gold}
        </h6>
        <div id="user-menu">
          <h5
            id="text"
            className="border border-dark p-1 px-2 rounded-pill"
            onClick={() => setShowInventory(true)}
          >
            <img
              src="bag_icon.png"
              className="m-1"
              alt="inventory-icon"
              width={"18px"}
            />
            Inventory
          </h5>
          <h5
            id="text"
            className="border border-dark p-1 px-2 rounded-pill"
            onClick={() => setShowMonsters(true)}
          >
            <img
              src="bag_icon.png"
              className="m-1"
              alt="inventory-icon"
              width={"18px"}
            />
            Monsters
          </h5>
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
