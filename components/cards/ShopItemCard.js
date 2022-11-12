import React, { useEffect, useState } from "react";
import { traderContract } from "../../hooks/useContract";

const ShopItemCard = ({ activeItem, item, setActiveItem }) => {
  const itemNameMap = new Map([
    [0, "Gold Coins"],
    [1, "Berry"],
    [2, "Energy Potion"],
    [3, "Exp Potion"],
    [4, "Crystals"],
  ]);

  useEffect(() => {}, [activeItem]);

  return (
    <div
      id={activeItem === item ? "item-card-active" : "item-card"}
      className="card col-3 p-2 m-2 d-flex flex-column justify-content-center align-items-center text-center"
      style={{ height: "10rem", backgroundColor: "#FEE0C0" }}
      onClick={() => setActiveItem(parseInt(item))}
    >
      <img
        src={item + ".png"}
        width={"50px"}
        className="p-1"
        alt="shop-item-img"
      />
      <div className="p-1">
        <h5 className="card-title m-1" id="text">
          {itemNameMap.get(parseInt(item))}
        </h5>
      </div>
    </div>
  );
};

export default ShopItemCard;
