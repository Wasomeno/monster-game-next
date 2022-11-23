import Image from "next/image";
import React, { useEffect, useState } from "react";

const ShopItemCard = ({ activeItem, data, item, setActiveItem }) => {
  return (
    <div
      id={activeItem === item ? "item-card-active" : "item-card"}
      className="w-2/12 p-2 m-2 flex flex-col justify-center items-center text-center rounded bg-slate-50 bg-opacity-25"
      onClick={() => setActiveItem(parseInt(item))}
    >
      <Image
        src={"/items" + data.image}
        width={"50px"}
        height={"50px"}
        className="p-1"
        alt="shop-item-img"
      />
      <div className="p-1">
        <h5 className="font-monogram text-xl tracking-wide text-white m-1">
          {data.name}
        </h5>
      </div>
    </div>
  );
};

export default ShopItemCard;
