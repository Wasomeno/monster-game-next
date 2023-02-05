import React, { useState } from "react";

import { BackButton } from "@/components/Buttons/Buttons";
import Modal from "@/components/Modal";
import useInventory from "@/components/reactQuery/queries/useInventory";

import LoadingSpinner from "../LoadingSpinner";
import InventoryItemDetails from "./InventoryItemDetails";
import { InventoryItems } from "./InventoryItems";

export const InventoryModal = ({ showInventory, toggleShowInventory }) => {
  const [activeItem, setActiveItem] = useState(0);
  const { data: inventory, isLoading, isError } = useInventory();

  return (
    <Modal show={showInventory} toggleShow={toggleShowInventory}>
      <div className="flex items-center justify-center">
        <BackButton onClick={() => toggleShowInventory()} />
        <div className="w-10/12">
          <h2 className="font-monogram p-3 text-center text-3xl tracking-wide text-white">
            Inventory
          </h2>
        </div>
      </div>
      <div className="flex h-2/3 items-start justify-center p-3">
        {isLoading ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <LoadingSpinner />
          </div>
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
};
