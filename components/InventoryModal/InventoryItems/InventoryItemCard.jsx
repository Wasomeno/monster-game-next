import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

import { Paragraph } from "../../Texts";

const InventoryItemCard = ({ isActive, details, setActive }) => {
  const itemsData = useQuery(["itemsData"], async () => {
    const data = await fetch("items/items.json");
    return await data.json();
  });
  const getItemData = (item) => {
    return itemsData.data?.find((_, index) => index === item);
  };
  return (
    <div
      className="col-span-2 flex h-40 cursor-pointer flex-col items-center justify-around rounded-md p-2"
      onClick={() => setActive(details.item)}
      style={{
        backgroundColor: isActive ? "#423f3e" : "#2b2b2b",
      }}
    >
      <div className="p-2">
        <h5 className="font-monogram m-0 text-xl tracking-wide text-white">
          x {details.amount.toString()}
        </h5>
      </div>
      <Image
        src={"/items" + getItemData(details.item)?.image}
        alt="items-img"
        width={"60"}
        height={"60"}
        className="p-2"
        priority={true}
      />
      <div>
        <Paragraph>{getItemData(details.item)?.name}</Paragraph>
      </div>
    </div>
  );
};

export default InventoryItemCard;
