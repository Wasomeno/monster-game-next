import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { getItemDetails } from "../../fetchers/fetchers";
import { CustomControl } from "../buttons/IncrementDecrementControl";

const ShopItemDetails = ({ activeItem, item }) => {
  const itemDetails = useQuery(["itemDetails", item], getItemDetails(item));
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemNameMap = new Map([
    [0, "Gold Coins"],
    [1, "Berry"],
    [2, "Energy Potion"],
    [3, "Exp Potion"],
    [4, "Crystals"],
  ]);

  const increment = () => {
    if (quantity >= parseInt(itemDetails.data.limit)) return;
    setQuantity((currentQuantity) => currentQuantity + 1);
  };

  const decrement = () => {
    if (quantity <= 1) return;
    setQuantity((currentQuantity) => currentQuantity - 1);
  };

  if (activeItem !== item) return;
  return (
    <div
      id="item-details-frame"
      className=" p-3 rounded"
      style={{ backgroundColor: "#FEE0C0" }}
    >
      <div id="item-details-body">
        {itemDetails.isLoading ? (
          <MoonLoader loading={loading} size={50} color="#000" />
        ) : (
          <>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h3 id="text">{itemNameMap.get(itemDetails.data.item)}</h3>
              <img
                src={itemDetails.data.item + ".png"}
                width={"80px"}
                className="p-3 m-3 border border-dark border-1 rounded"
                alt="shop-item-img"
                style={{ backgroundColor: "#fee0c0" }}
              />
              <div className="d-flex justify-content-between align-items-center w-75">
                <CustomControl
                  value={quantity}
                  increment={increment}
                  decrement={decrement}
                  width={"col-6"}
                />
                <div className="col-6">
                  <h4 id="text" className="text-center m-0">
                    {quantity *
                      ethers.utils.formatEther(itemDetails.data.price)}{" "}
                    ETH
                  </h4>
                </div>
              </div>
              <button
                id="text"
                className="btn btn-primary m-3"
                onClick={() =>
                  addToBag(
                    itemDetails.data.item.toString(),
                    itemDetails.data.price,
                    quantity
                  )
                }
              >
                Add to Bag
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShopItemDetails;
