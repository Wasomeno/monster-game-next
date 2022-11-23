import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

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
      className="w-2/12 h-2/6 m-1 p-2 flex flex-col justify-around items-center rounded-md"
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
        width={"40px"}
        height={"40px"}
        className="p-2"
      />
      <div>
        <h5 className="m-0 font-monogram text-xl tracking-wide text-white">
          {getItemData(details.item)?.name}
        </h5>
      </div>
    </div>
  );
};

export default InventoryItemCard;
