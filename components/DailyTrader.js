import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { traderContract, itemsContract } from "../hooks/useContract";
import AppContext from "../contexts/AppContext";
import { CustomControl } from "./buttons/IncrementDecrementControl";
import { useLoading, useToast } from "../stores/stores";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getTrades } from "../fetchers/fetchers";
import {
  tradeItem,
  tradeItemApproved,
  tradeItemNotApproved,
} from "../mutations/mutations";

const DailyTrader = ({ showTrader, toggleShowTrader }) => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  const [quantity, setQuantity] = useState([]);
  const user = useContext(AppContext).account[0];
  const trades = useQuery(["dailyTrades"], () => getTrades());
  const tradeMutation = useMutation(
    (index) =>
      isApproved
        ? tradeItemApproved(index, quantity[index], user)
        : tradeItemNotApproved(index, quantity[index], user),
    {
      onMutate: () => toggleLoading("Trading your items"),
      onSettled: () => toggleLoading(),
      onError: (error) => toastError(error),
      onSuccess: () => toastSuccess("Trade succesful"),
    }
  );

  const isApproved = async () => {
    const itemsHandler = itemsContract();
    const traderHandler = traderContract();
    return await itemsHandler.isApprovedForAll(user, traderHandler.address);
  };

  const increment = (trade) => {
    const tradeDetails = trades[trade];
    if (quantity[trade] >= parseInt(tradeDetails.limit)) return;
    const newValue = quantity.map((value, index) => {
      if (index === trade) {
        return value + 1;
      } else {
        return value;
      }
    });
    setQuantity(newValue);
  };

  const decrement = (trade) => {
    const tradeDetails = trades[trade];
    if (quantity[trade] >= parseInt(tradeDetails.limit)) return;
    const newValue = quantity.map((value, index) => {
      if (index === trade) {
        return value - 1;
      } else {
        return value;
      }
    });
    setQuantity(newValue);
  };

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
        <div className="table-responsive">
          <table className="table align-middle text-center">
            <thead>
              <tr>
                <th scope="col" id="text" className="fw-bold text-white">
                  Item (Received)
                </th>
                <th scope="col" id="text" className="fw-bold text-white">
                  Trade for
                </th>
                <th scope="col" id="text" className="fw-bold text-white">
                  Quantity
                </th>
                <th scope="col" id="text" className="fw-bold text-white">
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
                    <h5 id="text" className="m-0 text-white">
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
                    <h5 id="text" className="m-0 text-white">
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
                    <CustomControl
                      value={quantity[index]}
                      increment={() => increment(index)}
                      decrement={() => decrement(index)}
                    />
                  </td>
                  <td>
                    <button
                      className="btn"
                      id="text"
                      style={{ backgroundColor: "#A64B2A", color: "#fff" }}
                      onClick={() => tradeMutation.mutate(index)}
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
