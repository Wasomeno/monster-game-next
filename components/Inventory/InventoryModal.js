import React, { useContext, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import AppContext from "../../contexts/AppContext";
import { useQuery } from "@tanstack/react-query";
import { getInventory } from "../../fetchers/fetchers";
import { BackButton } from "../Buttons";
import Modal from "../Modal";
import InventoryItemDetails from "./InventoryItemDetails";
import InventoryItems from "./InventoryItems";

function InventoryModal({ showInventory, setShowInventory }) {
  const [activeItem, setActiveItem] = useState(0);
  const user = useContext(AppContext).account[0];
  const inventory = useQuery(["inventory"], getInventory(user));

  return (
    <Modal show={showInventory}>
      <div className="flex justify-center items-center">
        <BackButton onClick={() => setShowInventory(false)} />
        <div className="w-10/12">
          <h2 className="text-center p-3 text-white font-monogram text-3xl tracking-wide">
            Inventory
          </h2>
        </div>
      </div>
      <div className="flex justify-center items-start p-3 h-2/3">
        {inventory.isLoading ? (
          <MoonLoader size={50} loading={inventory.isLoading} color={"#eee"} />
        ) : (
          <>
            <InventoryItems
              items={inventory.data}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
            <InventoryItemDetails activeItem={activeItem} />
          </>
        )}
      </div>
    </Modal>
  );
}

export default InventoryModal;
