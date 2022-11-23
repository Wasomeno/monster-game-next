import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { ethers } from "ethers";
import { useContext, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import AppContext from "../../contexts/AppContext";
import { getDailyShopLimit, getItemDetails } from "../../fetchers/fetchers";
import { buy } from "../../mutations/mutations";
import { buySides } from "../../mutations/sideffects";
import BuyAmountControl from "./BuyAmountControl";

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

  const buyMutation = useMutation(() => {
    const total = (quantity * itemDetails.data?.price).toString();
    return buy([activeItem], [quantity], user, total);
  }, buySides());

  if (activeItem !== item) return;
  return (
    <div className="h-full p-3 rounded flex flex-col justify-center items-center bg-slate-600">
      {itemDetails.isLoading ? (
        <MoonLoader loading={itemDetails.isFetching} size={50} color="#fff" />
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <h3 className="font-monogram text-white text-2xl tracking-wide">
            {itemsData.data[item].name}
          </h3>
          <div className="m-3 bg-slate-100 p-2 rounded">
            <Image
              src={"/items" + itemsData.data[item].image}
              width={"50"}
              height={"50"}
              alt="shop-item-img"
              quality={100}
            />
          </div>
          <div className="flex justify-between items-center w-2/3">
            <BuyAmountControl
              amount={quantity}
              setAmount={setQuantity}
              limit={itemDetails.data?.limit}
            />
            <div className="w-6/12">
              <h4 className="text-center text-white font-monogram tracking-wide text-xl m-0">
                {quantity * ethers.utils.formatEther(itemDetails.data?.price)}{" "}
                ETH
              </h4>
            </div>
          </div>
          <button
            disabled={parseInt(getLimit(item)) === itemDetails.data.limit}
            className="bg-slate-50 text-lg font-monogram m-3 w-2/3 p-2 rounded"
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
