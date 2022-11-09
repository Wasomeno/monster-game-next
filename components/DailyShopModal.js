import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { traderContract } from "../hooks/useContract";
import AppContext from "../contexts/AppContext";
import useProvider from "../hooks/useProvider";
import ShopItemDetails from "./cards/ShopItemDetails";
import ShopItemCard from "./cards/ShopItemCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getShop } from "../fetchers/fetchers";
import { buy } from "../mutations/mutations";

const DailyShopModal = ({ showShop, toggleShowShop }) => {
  const [bag, setBag] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [activeItem, setActiveItem] = useState(0);
  const [itemDetails, setItemDetails] = useState(null);
  const user = useContext(AppContext).account[0];
  const dailyShop = useQuery(["dailyShop"], getShop());
  const buyMutation = useMutation(() =>
    buy(activeItem, quantity[activeItem], user, getTotal())
  );

  // const addToBag = (item, price, quantity) => {
  //   let bagTemp = [...bag];
  //   if (bagTemp.length >= 3) return;
  //   const itemBigNumb = BigNumber.from(item);
  //   bagTemp.push({ itemBigNumb, price, quantity });
  //   setBag(bagTemp);
  //   toast.success("item #" + item + " added to bag");
  // };

  function getTotal() {
    let totalTemp = 0;
    for (let item of bag) {
      totalTemp += item.price * item.quantity;
    }
    console.log(totalTemp.toString());
    return totalTemp.toString();
  }

  useEffect(() => {
    getShop();
  }, [activeItem]);

  if (!showShop) return;
  return (
    <>
      <motion.div
        id="modal-screen"
        className="h-100 w-100 bg-dark bg-opacity-75"
        onClick={toggleShowShop}
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
        <div id="modal-body">
          <img
            src="/back_icon.png"
            onClick={toggleShowShop}
            width={"45px"}
            alt="back-img"
          />
          <div className="row justify-content-evenly align-items-start">
            <div className="col-6 d-flex flex-column justify-content-center align-items-center">
              <h2 id="modal-title" className="text-center">
                Shop
              </h2>
              <div className="d-flex justify-content-center align-items-center flex-wrap w-100">
                {dailyShop.data.map((shop) => (
                  <ShopItemCard
                    key={parseInt(shop.item)}
                    activeItem={activeItem}
                    item={shop.item}
                    setActiveItem={setActiveItem}
                    setDetails={setItemDetails}
                  />
                ))}
              </div>
            </div>

            <div className="col-4 p-3">
              <ShopItemDetails
                itemDetails={itemDetails}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </div>
          </div>
          <div
            id="bag-container"
            className="d-flex col-2 justify-content-center p-3 flex-wrap"
          >
            <div className="col-2 text-center">
              <h5 id="modal-title" className="m-0 bg-danger rounded-circle">
                {bag.length}
              </h5>
              <img
                src="/bag_icon.png"
                width={"60px"}
                onClick={() => buyMutation.mutate()}
                alt="basket-icon"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default DailyShopModal;