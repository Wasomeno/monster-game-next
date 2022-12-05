import Image from "next/image";
import React from "react";

const ShopItemCard = ({ activeItem, item, setActiveItem }) => {
  return (
    <div
      id={activeItem === item.id ? "item-card-active" : "item-card"}
      className="col-span-2 p-2 flex flex-col justify-center items-center text-center rounded bg-slate-50 bg-opacity-25 cursor-pointer"
      onClick={() => setActiveItem(parseInt(item.id))}
    >
      <Image
        src={"/items" + item.image}
        width={"50px"}
        height={"50px"}
        className="p-1"
        alt="shop-item-img"
      />
      <div className="p-1">
        <h5 className="font-monogram text-xl tracking-wide text-white m-1">
          {item.name}
        </h5>
      </div>
    </div>
  );
};

export default ShopItemCard;
