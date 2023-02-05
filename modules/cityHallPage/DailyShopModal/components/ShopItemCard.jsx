import Image from "next/image";
import React from "react";

const ShopItemCard = ({ activeItem, item, setActiveItem }) => {
  return (
    <div
      id={activeItem === item.id ? "item-card-active" : "item-card"}
      className="col-span-2 flex cursor-pointer flex-col items-center justify-center rounded bg-slate-50 bg-opacity-25 p-2"
      onClick={() => setActiveItem(parseInt(item.id))}
    >
      <Image
        src={"/items" + item.image}
        width="50"
        height="50"
        className="p-1"
        alt="shop-item-img"
      />
      <div className="p-1">
        <h5 className="font-monogram m-1 text-xl tracking-wide text-white">
          {item.name}
        </h5>
      </div>
    </div>
  );
};

export default ShopItemCard;
