import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { traderContract, itemsContract } from "../hooks/useContract";
import AppContext from "./AppContext";
import useProvider from "../hooks/useProvider";

const CityHallModal = ({
  showShop,
  showTrader,
  toggleShowShop,
  toggleShowTrader,
}) => {
  const [bag, setBag] = useState([]);
  const [dailyShop, setDailyShop] = useState([]);
  const [trades, setTrades] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [activeItem, setActiveItem] = useState(0);
  const toast = useContext(AppContext).toast;
  const loading = useContext(AppContext).loading;
  const user = useContext(AppContext).account[0];
  const traderHandler = traderContract();
  const itemsHandler = itemsContract();
  const provider = useProvider();

  async function getShop() {
    let quantities = [];
    await traderHandler.getDailyShop().then((shop) => {
      setDailyShop(shop);
      for (let i = 0; i < shop.length; ++i) {
        quantities.push(1);
      }
      setQuantity(quantities);
    });
  }

  async function getTrades() {
    await traderHandler.getDailyTrades().then((trades) => {
      setTrades(trades);
    });
  }

  const addToBag = (item, price, quantity) => {
    let bagTemp = [...bag];
    if (bagTemp.length >= 3) return;
    const itemBigNumb = BigNumber.from(item);
    bagTemp.push({ itemBigNumb, price, quantity });
    setBag(bagTemp);
    toast.success("item #" + item + " added to bag");
  };

  function getTotal() {
    let totalTemp = 0;
    for (let item of bag) {
      totalTemp += item.price * item.quantity;
    }
    console.log(totalTemp.toString());
    return totalTemp.toString();
  }

  async function buy() {
    let itemsSelected = [];
    if (quantity.length < 1 || bag.length < 1) {
      toast.error("You did not select any items");
    } else {
      for (let item of bag) {
        itemsSelected.push(item.itemBigNumb);
      }
      try {
        await traderHandler
          .buyItems(itemsSelected, quantity, user, {
            value: getTotal(),
          })
          .then((response) => {
            loading.setLoadingText("Items is on the way...");
            loading.toggleLoading();
            provider.waitForTransaction(response.hash).then(() => {
              loading.toggleLoading();
              setBag([]);
              getShop();
              toast.success("Transaction Success");
            });
          });
      } catch (error) {
        toast.error(error.reason);
      }
    }
  }

  async function tradeItem(index) {
    const isApproved = await itemsHandler.isApprovedForAll(
      user,
      traderHandler.address
    );
    if (isApproved) {
      try {
        await traderHandler
          .tradeItem(index, quantity[index], user)
          .then((response) => {
            loading.setLoadingText("Trader preparing the trade...");
            loading.toggleLoading();
            provider.waitForTransaction(response.hash).then(() => {
              loading.toggleLoading();
              toast.success("Trade Success");
            });
          });
      } catch (error) {
        toast.error(error.reason);
      }
    } else {
      try {
        await itemsHandler
          .setApprovalForAll(traderHandler.address, true)
          .then((response) => {
            provider.waitForTransaction(response.hash).then(() => {
              traderHandler
                .tradeItem(index, quantity[index], user)
                .then((response) => {
                  loading.setLoadingText("Trader preparing the trade...");
                  loading.toggleLoading();
                  provider.waitForTransaction(response.hash).then(() => {
                    loading.toggleLoading();
                    toast.success("Trade Success");
                  });
                });
            });
          });
      } catch (error) {
        toast.error(error.reason);
      }
    }
  }

  const increment = (index, limit) => {
    let test = [...quantity];
    if (test[index] >= limit) return;
    test[index] = test[index] + 1;
    setQuantity(test);
  };

  const decrement = (index) => {
    let test = [...quantity];
    if (test[index] <= 1) return;
    test[index] = test[index] - 1;
    setQuantity(test);
  };

  useEffect(() => {
    getShop();
    getTrades();
  }, []);

  if (!showShop && !showTrader) return;

  return (
    <>
      {showShop ? (
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
                    {dailyShop.map((shop, index) => (
                      <div
                        id={
                          activeItem === index
                            ? "item-card-active"
                            : "item-card"
                        }
                        className="card col-3 p-2 m-2 d-flex flex-column justify-content-center align-items-center text-center"
                        key={index}
                        style={{ height: "10rem", backgroundColor: "#FEE0C0" }}
                        onClick={() => setActiveItem(index)}
                      >
                        <img
                          src={shop.item.toString() + ".png"}
                          width={"50px"}
                          className="p-1"
                          alt="shop-item-img"
                        />
                        <div className="p-1">
                          <h5 className="card-title m-1" id="text">
                            {shop.item.toString() === "0"
                              ? "Gold Coins"
                              : shop.item.toString() === "1"
                              ? "Berry"
                              : shop.item.toString() === "2"
                              ? "Hunger Potion"
                              : shop.item.toString() === "3"
                              ? "Exp Potion"
                              : shop.item.toString() === "4"
                              ? "Token Crystal"
                              : ""}{" "}
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-4 p-3">
                  <div
                    id="item-details-frame"
                    className=" p-3 rounded"
                    style={{ backgroundColor: "#FEE0C0" }}
                  >
                    <div id="item-details-body">
                      <h4 id="modal-title" className="text-center">
                        Item Details
                      </h4>
                      <div className="d-flex flex-column justify-content-center align-items-center">
                        <h3 id="text">
                          {dailyShop[activeItem].item.toString() === "0"
                            ? "Gold Coins"
                            : dailyShop[activeItem].item.toString() === "1"
                            ? "Berry"
                            : dailyShop[activeItem].item.toString() === "2"
                            ? "Hunger Potion"
                            : dailyShop[activeItem].item.toString() === "3"
                            ? "Exp Potion"
                            : dailyShop[activeItem].item.toString() === "4"
                            ? "Token Crystal"
                            : ""}{" "}
                        </h3>
                        <img
                          src={dailyShop[activeItem].item.toString() + ".png"}
                          width={"80px"}
                          className="p-3 m-3 border border-dark border-1 rounded"
                          alt="shop-item-img"
                          style={{ backgroundColor: "#fee0c0" }}
                        />
                        <div className="d-flex justify-content-evenly align-items-center">
                          <div className="col-6 d-flex justify-content-center align-items-center">
                            <button
                              className="btn btn-danger text-center"
                              onClick={() => decrement(activeItem)}
                            >
                              -
                            </button>
                            <h5 id="text" className="mx-1 p-2">
                              {quantity[activeItem]}
                            </h5>
                            <button
                              className="btn btn-success text-center"
                              onClick={() =>
                                increment(
                                  activeItem,
                                  dailyShop[activeItem].quantity
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                          <div className="col-4">
                            <h4 id="text" className="text-center">
                              {quantity[activeItem] *
                                ethers.utils.formatEther(
                                  dailyShop[activeItem].price
                                )}{" "}
                              ETH
                            </h4>
                          </div>
                        </div>
                        <button
                          id="text"
                          className="btn btn-primary m-3"
                          onClick={() =>
                            addToBag(
                              dailyShop[activeItem].item.toString(),
                              dailyShop[activeItem].price,
                              quantity[activeItem]
                            )
                          }
                        >
                          Add to Bag
                        </button>
                      </div>
                    </div>
                  </div>
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
                    onClick={buy}
                    alt="basket-icon"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      ) : (
        <>
          <motion.div
            id="modal-screen"
            className="h-100 w-100 bg-dark bg-opacity-75"
            onClick={toggleShowTrader}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.25 }}
          />
          <motion.div
            id="shop-modal"
            className="container h-75 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <img
              src="/back_icon.png"
              onClick={toggleShowTrader}
              width={"45px"}
              alt="back-img"
            />
            <div className="row justify-content-center">
              <h2 id="modal-title" className="text-center">
                Trader
              </h2>
            </div>
            <div className="row justify-content-center align-items-center">
              <table className="table text-center">
                <thead>
                  <tr>
                    <th scope="col" id="modal-title">
                      Item (Received)
                    </th>
                    <th scope="col" id="modal-title">
                      Trade for
                    </th>
                    <th scope="col" id="modal-title">
                      Quantity
                    </th>
                    <th scopr="col" id="modal-title">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {trades.map((trade, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={trade.itemReceived.toString() + ".png"}
                          alt="items-img"
                          width={"45px"}
                        />
                        <h5 id="modal-title">
                          {trade.itemReceived.toString() === "0"
                            ? "Gold Coins"
                            : trade.itemReceived.toString() === "1"
                            ? "Berry"
                            : trade.itemReceived.toString() === "2"
                            ? "Hunger Potion"
                            : trade.itemReceived.toString() === "3"
                            ? "Exp Potion"
                            : trade.itemReceived.toString() === "4"
                            ? "Token Crystal"
                            : ""}{" "}
                          x{trade.quantityReceived.toString()}
                        </h5>
                      </td>
                      <td>
                        <img
                          src={trade.itemTrade.toString() + ".png"}
                          alt="items-img"
                          width={"45px"}
                        />
                        <h5 id="modal-title">
                          {trade.itemTrade.toString() === "0"
                            ? "Gold Coins"
                            : trade.itemTrade.toString() === "1"
                            ? "Berry"
                            : trade.itemTrade.toString() === "2"
                            ? "Hunger Potion"
                            : trade.itemTrade.toString() === "3"
                            ? "Exp Potion"
                            : trade.itemTrade.toString() === "4"
                            ? "Token Crystal"
                            : ""}{" "}
                          x{trade.quantityTrade.toString()}
                        </h5>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center align-items-center">
                          <button
                            className="btn btn-danger"
                            onClick={() => decrement(index)}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="form-control text-center w-25"
                            value={quantity[index]}
                            name={index}
                          />
                          <button
                            className="btn btn-success"
                            onClick={() =>
                              increment(index, parseInt(trade.limit))
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn"
                          id="text"
                          style={{ backgroundColor: "#A64B2A", color: "#fff" }}
                          onClick={() => tradeItem(index)}
                        >
                          Trade
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default CityHallModal;
