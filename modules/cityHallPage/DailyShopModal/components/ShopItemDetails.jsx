import Image from "next/image";
import { useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";

import { StartActivityButton } from "@/components/Buttons/Buttons";
import buyItem from "@/components/reactQuery/mutations/buyItem";
import useUserDailyShopLimit from "@/components/reactQuery/queries/useUserDailyShopLimit";
import { Paragraph } from "@/components/Texts";

import BuyAmountControl from "./BuyAmountControl";

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
    <div className="flex h-full flex-col items-center justify-start gap-5 rounded bg-slate-600 p-3">
      <div>
        <Paragraph>Item Details</Paragraph>
      </div>
      {isLoading ? (
        <MoonLoader loading={isLoading} size={50} color="#fff" />
      ) : (
        <>
          <div className="flex w-full flex-col items-center justify-center">
            <h3 className="font-monogram text-2xl tracking-wide text-white">
              {item.name}
            </h3>
            <div className="m-3 rounded bg-slate-100 p-2">
              <Image
                src={"/items" + item.image}
                width={"50"}
                height={"50"}
                alt="shop-item-img"
                quality={100}
              />
            </div>
            <div className="my-2 flex w-full items-center justify-between">
              <BuyAmountControl
                amount={quantity}
                setAmount={setQuantity}
                limit={item.limit}
              />
              <div className="w-6/12">
                <h4 className="font-monogram m-0 text-center text-xl tracking-wide text-white">
                  {quantity * formatEther(item.price)} ETH
                </h4>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <StartActivityButton
              text="Buy"
              size="medium"
              condition={parseInt(getLimit(item.id)) === item.limit}
              onClick={() => buy()}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ShopItemDetails;
