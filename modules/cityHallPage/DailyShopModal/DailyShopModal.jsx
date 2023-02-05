import { useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";

import useDailyShop from "@/components/reactQuery/queries/useDailyShop";
import { ModalTitle } from "@/components/Texts";

import ShopItemCard from "./components/ShopItemCard";
import ShopItemDetails from "./components/ShopItemDetails";

export const DailyShopModal = () => {
  const [activeItem, setActiveItem] = useState(0);
  const { data: dailyShop, isLoading, isError } = useDailyShop();
  return (
    <div className="mx-3 h-full">
      <div className="flex h-full items-start justify-around">
        <div className="flex w-8/12 flex-col items-center justify-center">
          <div className="mb-2">
            <ModalTitle>Daily Shop</ModalTitle>
          </div>
          {isLoading ? (
            <div className="flex justify-center">
              <MoonLoader loading={isLoading} size={30} color="white" />
            </div>
          ) : (
            <div className="grid w-5/6 grid-cols-9 gap-4">
              {dailyShop?.map((item) => (
                <ShopItemCard
                  key={parseInt(item.id)}
                  activeItem={activeItem}
                  item={item}
                  setActiveItem={setActiveItem}
                />
              ))}
            </div>
          )}
        </div>

        <div className="h-2/3 w-3/12 p-3">
          {dailyShop?.map((item) =>
            activeItem !== item.id ? null : (
              <ShopItemDetails
                key={item.id}
                activeItem={activeItem}
                item={item}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};
