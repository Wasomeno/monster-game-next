import React, { useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { BackButton } from "../Buttons/Buttons";
import Modal from "../Modal";
import InventoryItemDetails from "./InventoryItemDetails";
import InventoryItems from "./InventoryItems";
import useInventory from "../../lib/queries/Inventory/useInventory";

function InventoryModal({ showInventory, toggleShowInventory }) {
  const [activeItem, setActiveItem] = useState(0);
  const { data: inventory, isLoading, isError } = useInventory();

  return (
    <Modal show={showInventory}>
      <div className="flex justify-center items-center">
        <BackButton onClick={() => toggleShowInventory()} />
        <div className="w-10/12">
          <h2 className="text-center p-3 text-white font-monogram text-3xl tracking-wide">
            Inventory
          </h2>
        </div>
      </div>
      <div className="flex justify-center items-start p-3 h-2/3">
        {isLoading ? (
          <MoonLoader size={50} loading={isLoading} color={"#eee"} />
        ) : (
          <>
            <InventoryItems
              items={inventory}
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
