import Image from "next/image";
import React, { useEffect, useState } from "react";

const ShopItemCard = ({ activeItem, data, item, setActiveItem }) => {
  return (
    <div
      id={activeItem === item ? "item-card-active" : "item-card"}
      className="card col-3 p-2 m-2 d-flex flex-column justify-content-center align-items-center text-center"
      style={{ height: "10rem", backgroundColor: "#FEE0C0" }}
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
        <h5 className="card-title m-1" id="text">
          {data.name}
        </h5>
      </div>
    </div>
  );
};

export default ShopItemCard;
