import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { Paragraph } from "../Texts";

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
        <Paragraph>{getItemData(activeItem)?.name}</Paragraph>

        <Image
          src={"/items" + getItemData(activeItem)?.image}
          width={"50px"}
          height={"50px"}
          className="p-3 m-3 border border-dark border-1 rounded"
          alt="shop-item-img"
          priority={true}
        />
        <div className="flex justify-center items-center text-center my-2 p-2 px-4">
          <Paragraph>{getItemData(activeItem)?.description}</Paragraph>
        </div>
      </div>
    </div>
  );
};

export default InventoryItemDetails;
