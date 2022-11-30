import Image from "next/image";
import { useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import BuyAmountControl from "./BuyAmountControl";
import { StartActivityButton } from "../Buttons/Buttons";
import buyItem from "../../mutations/buyItem";
import { useUserDailyShopLimit } from "../../fetchers/useDailyShop";

const ShopItemDetails = ({ activeItem, item }) => {
  const [quantity, setQuantity] = useState(1);
  const { data: dailyLimit, isLoading, isError } = useUserDailyShopLimit();

  const buy = buyItem({
    itemSelected: activeItem,
    quantity: quantity,
    total: (quantity * item.price).toString(),
  });

  const getLimit = (itemId) => {
    if (isLoading) return;
    return dailyLimit[itemId];
  };

  const formatEther = (value) => {
    return parseInt(value) / 10 ** 18;
  };

  if (activeItem !== item.id) return;
  return (
    <div className="h-full p-3 rounded flex flex-col justify-center items-center bg-slate-600">
      {isLoading ? (
        <MoonLoader loading={isLoading} size={50} color="#fff" />
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <h3 className="font-monogram text-white text-2xl tracking-wide">
            {item.name}
          </h3>
          <div className="m-3 bg-slate-100 p-2 rounded">
            <Image
              src={"/items" + item.image}
              width={"50"}
              height={"50"}
              alt="shop-item-img"
              quality={100}
            />
          </div>
          <div className="flex justify-between items-center w-full my-2">
            <BuyAmountControl
              amount={quantity}
              setAmount={setQuantity}
              limit={item.limit}
            />
            <div className="w-6/12">
              <h4 className="text-center text-white font-monogram tracking-wide text-xl m-0">
                {quantity * formatEther(item.price)} ETH
              </h4>
            </div>
          </div>
          <StartActivityButton
            text="Buy"
            condition={parseInt(getLimit(item.id)) === item.limit}
            onClick={() => buy()}
          />
        </div>
      )}
    </div>
  );
};

export default ShopItemDetails;
