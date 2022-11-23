import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

const InventoryItemDetails = ({ activeItem }) => {
  const itemsData = useQuery(["itemsData"], async () => {
    const data = await fetch("items/items.json");
    return await data.json();
  });
  const getItemData = (item) => {
    return itemsData.data?.find((_, index) => index === item);
  };
  return (
    <div className="w-3/12 bg-slate-300 bg-opacity-25 h-full rounded">
      <div className="flex justify-center">
        <h3 className="m-0 p-2 text-white text-center font-monogram text-2xl tracking-wider">
          Item Details
        </h3>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-white font-monogram text-2xl my-2">
          {getItemData(activeItem)?.name}
        </h3>
        <Image
          src={"/items" + getItemData(activeItem)?.image}
          width={"50px"}
          height={"50px"}
          className="p-3 m-3 border border-dark border-1 rounded"
          alt="shop-item-img"
        />
        <div className="row justify-content-center align-items-center"></div>
        {/* <button
          id="text"
          className={
            activeItem !== 2 && activeItem !== 3
              ? "btn btn-primary m-3 disabled"
              : "btn btn-primary m-3"
          }
          onClick={() => setShowUseItem(true)}
        >
          <h5 className="m-0 px-2">Use Item</h5>
        </button> */}
      </div>
    </div>
  );
};

export default InventoryItemDetails;
