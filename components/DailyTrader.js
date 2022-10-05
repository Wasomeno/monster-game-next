import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { traderContract, itemsContract } from "../hooks/useContract";
import AppContext from "./AppContext";
import useProvider from "../hooks/useProvider";
import IncrementDecrementControl from "./buttons/IncrementDecrementControl";

const DailyTrader = ({ showTrader, toggleShowTrader }) => {
  const [trades, setTrades] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const toast = useContext(AppContext).toast;
  const loading = useContext(AppContext).loading;
  const user = useContext(AppContext).account[0];
  const traderHandler = traderContract();
  const itemsHandler = itemsContract();
  const provider = useProvider();

  async function getTrades() {
    let quantities = [];
    await traderHandler.getDailyTrades().then((trades) => {
      setTrades(trades);
      trades.forEach(() => {
        quantities.push(1);
      });
      setQuantity(quantities);
    });
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

  useEffect(() => {
    getTrades();
  }, []);

  if (!showTrader) return;

  return (
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
                    <IncrementDecrementControl
                      max={parseInt(trade.limit)}
                      value={quantity[index]}
                      setValue={setQuantity}
                    />
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
  );
};

export default DailyTrader;
