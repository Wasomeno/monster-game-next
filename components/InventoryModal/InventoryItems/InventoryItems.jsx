import React from "react";

import InventoryItemCard from "./InventoryItemCard";

export const InventoryItems = ({ items, activeItem, setActiveItem }) => {
  return (
    <div className="grid w-8/12 grid-cols-10 gap-3">
      {items && items.length < 1 ? (
        <p className="font-monogram m-0 text-center text-xl tracking-wide text-white">
          No items in inventory
        </p>
      ) : (
        items.map((item, index) => (
          <InventoryItemCard
            key={index}
            details={{ item: index, amount: item }}
            isActive={activeItem === index}
            setActive={setActiveItem}
          />
        ))
      )}
    </div>
  );
};
