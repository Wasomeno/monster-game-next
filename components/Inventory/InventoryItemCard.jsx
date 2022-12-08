import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { Paragraph } from "../Texts";

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
      className="col-span-2 h-40 p-2 flex flex-col justify-around items-center rounded-md cursor-pointer"
      onClick={() => setActive(details.item)}
      style={{
        backgroundColor: isActive ? "#423f3e" : "#2b2b2b",
      }}
    >
      <div className="p-2">
        <h5 className="m-0 font-monogram text-xl tracking-wide text-white">
          x {details.amount.toString()}
        </h5>
      </div>
      <Image
        src={"/items" + getItemData(details.item)?.image}
        alt="items-img"
        width={"40"}
        height={"40"}
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
