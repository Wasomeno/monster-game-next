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
    <div className="h-full w-3/12 rounded bg-slate-300 bg-opacity-25">
      <div className="flex justify-center">
        <h3 className="font-monogram m-0 p-2 text-center text-2xl tracking-wider text-white">
          Item Details
        </h3>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Paragraph>{getItemData(activeItem)?.name}</Paragraph>

        <Image
          src={"/items" + getItemData(activeItem)?.image}
          width={"80"}
          height={"80"}
          className="border-dark border-1 m-3 rounded border p-3"
          alt="shop-item-img"
          priority={true}
        />
        <div className="my-2 flex items-center justify-center p-2 px-4 text-center">
          <Paragraph>{getItemData(activeItem)?.description}</Paragraph>
        </div>
      </div>
    </div>
  );
};

export default InventoryItemDetails;
