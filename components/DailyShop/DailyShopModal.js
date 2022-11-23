import { useState } from "react";
import ShopItemDetails from "./ShopItemDetails";
import ShopItemCard from "./ShopItemCard";
import { useQuery } from "@tanstack/react-query";
import { getShop } from "../../fetchers/fetchers";
import { dailyShopModalStores } from "../../stores/modalStores";
import BackButton from "../BackButton";
import Modal from "../Modal";
import { ModalTitle } from "../Texts";

const DailyShopModal = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [show, toggleShow] = dailyShopModalStores((state) => [
    state.show,
    state.toggleShow,
  ]);
  const dailyShop = useQuery(["dailyShop"], getShop());
  const itemsData = useQuery(["itemsData"], async () => {
    const data = await fetch("items/items.json");
    return await data.json();
  });

  return (
    <Modal show={show}>
      <div className="h-full mx-3">
        <BackButton onClick={toggleShow} />
        <div className="flex justify-around items-start h-full">
          <div className="w-8/12 flex flex-col justify-center items-center">
            <ModalTitle>Daily Shop</ModalTitle>
            <div className="flex justify-start items-center flex-wrap w-full">
              {dailyShop.data?.map((shop) => (
                <ShopItemCard
                  key={parseInt(shop.item)}
                  activeItem={activeItem}
                  item={shop.item}
                  data={itemsData.data[shop.item]}
                  setActiveItem={setActiveItem}
                />
              ))}
            </div>
          </div>

          <div className="w-3/12 h-2/3 p-3">
            {dailyShop.data?.map((shop) =>
              activeItem !== shop.item ? null : (
                <ShopItemDetails activeItem={activeItem} item={shop.item} />
              )
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DailyShopModal;
