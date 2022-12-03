import React from "react";
import InventoryItemCard from "./InventoryItemCard";

const InventoryItems = ({ items, activeItem, setActiveItem }) => {
  return (
    <div className="w-8/12 grid grid-cols-10 gap-3">
      {items && items.length < 1 ? (
        <p className="m-0 text-white text-center font-monogram text-xl tracking-wide">
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

export default InventoryItems;
