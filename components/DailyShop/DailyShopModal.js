import { useState } from "react";
import ShopItemDetails from "./ShopItemDetails";
import ShopItemCard from "./ShopItemCard";
import { ModalTitle } from "../Texts";
import useDailyShop from "../../fetchers/useDailyShop";

const DailyShopModal = () => {
  const [activeItem, setActiveItem] = useState(0);
  const { data: dailyShop, isLoading, isError } = useDailyShop();
  return (
    <div className="h-full mx-3">
      <div className="flex justify-around items-start h-full">
        <div className="w-8/12 flex flex-col justify-center items-center">
          <div className="mb-2">
            <ModalTitle>Daily Shop</ModalTitle>
          </div>
          <div className="flex justify-start gap-4 items-center flex-wrap w-4/6">
            {dailyShop?.map((item) => (
              <ShopItemCard
                key={parseInt(item.id)}
                activeItem={activeItem}
                item={item}
                setActiveItem={setActiveItem}
              />
            ))}
          </div>
        </div>

        <div className="w-3/12 h-2/3 p-3">
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

export default DailyShopModal;
