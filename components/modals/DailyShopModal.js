import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../contexts/AppContext";
import ShopItemDetails from "../cards/ShopItemDetails";
import ShopItemCard from "../cards/ShopItemCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getShop } from "../../fetchers/fetchers";
import { buy } from "../../mutations/mutations";
import { dailyShopModalStores } from "../../stores/modalStores";
import BackButton from "../buttons/BackButton";

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
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            id="modal-screen"
            className="h-100 w-100 bg-dark bg-opacity-75"
            onClick={toggleShow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.25 }}
          />
          <motion.div
            id="shop-modal"
            className="container h-75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <div id="modal-body" className="h-100">
              <BackButton onClick={toggleShow} />
              <div className="row justify-content-evenly align-items-start h-100">
                <div className="col-6 d-flex flex-column justify-content-center align-items-center">
                  <h2 id="modal-title" className="text-center">
                    Shop
                  </h2>
                  <div className="d-flex justify-content-center align-items-center flex-wrap w-100">
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

                <div className="col-4 h-75 p-3">
                  {dailyShop.data?.map((shop) =>
                    activeItem !== shop.item ? null : (
                      <ShopItemDetails
                        activeItem={activeItem}
                        item={shop.item}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DailyShopModal;
