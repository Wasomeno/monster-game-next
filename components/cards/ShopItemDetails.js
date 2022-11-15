import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import AppContext from "../../contexts/AppContext";
import { getDailyShopLimit, getItemDetails } from "../../fetchers/fetchers";
import { buy } from "../../mutations/mutations";
import { buySides } from "../../mutations/sideffects";
import { CustomControl } from "../buttons/IncrementDecrementControl";

const ShopItemDetails = ({ activeItem, item }) => {
  const user = useContext(AppContext).account[0];
  const userDailyLimit = useQuery(
    ["dailyShopLimit", user],
    getDailyShopLimit(user)
  );
  const itemDetails = useQuery(["itemDetails", item], getItemDetails(item));
  const itemsData = useQuery(["itemsData"], async () => {
    const data = await fetch("items/items.json");
    return await data.json();
  });
  const [quantity, setQuantity] = useState(1);

  const getLimit = (item) => {
    if (userDailyLimit.isLoading) return;
    return userDailyLimit.data[item];
  };

  const increment = () => {
    if (quantity >= parseInt(itemDetails.data.limit)) return;
    setQuantity((currentQuantity) => currentQuantity + 1);
  };

  const decrement = () => {
    if (quantity <= 1) return;
    setQuantity((currentQuantity) => currentQuantity - 1);
  };

  const buyMutation = useMutation(() => {
    const total = (quantity * itemDetails.data?.price).toString();
    return buy([activeItem], [quantity], user, total);
  }, buySides());

  if (activeItem !== item) return;
  return (
    <div className="p-3 rounded text-white border border-2 border-white h-100 d-flex flex-column justify-content-center">
      {itemDetails.isLoading ? (
        <MoonLoader loading={itemDetails.isFetching} size={50} color="#000" />
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h3 id="text">{itemsData.data[item].name}</h3>
          <div className="m-3">
            <Image
              src={"/items" + itemsData.data[item].image}
              width={"80px"}
              height={"80px"}
              className="p-3 border border-dark border-1 rounded"
              alt="shop-item-img"
              style={{ backgroundColor: "#fee0c0" }}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center w-75">
            <CustomControl
              value={quantity}
              increment={increment}
              decrement={decrement}
              width={"col-6"}
            />
            <div className="col-6">
              <h4 id="text" className="text-center m-0">
                {quantity * ethers.utils.formatEther(itemDetails.data?.price)}{" "}
                ETH
              </h4>
            </div>
          </div>
          <button
            disabled={parseInt(getLimit(item)) === itemDetails.data.limit}
            id="text"
            className="btn btn-light m-3 w-75 p-2"
            onClick={() => buyMutation.mutate()}
          >
            Buy
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopItemDetails;
