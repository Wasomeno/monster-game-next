import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../contexts/AppContext";
import { CustomControl } from "../buttons/IncrementDecrementControl";
import { useLoading, useToast } from "../../stores/stores";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getTrades } from "../../fetchers/fetchers";
import {
  tradeItemApproved,
  tradeItemNotApproved,
} from "../../mutations/mutations";
import { dailyTradeModalStores } from "../../stores/modalStores";
import { tradeSides } from "../../mutations/sideffects";
import BackButton from "../buttons/BackButton";

const DailyTrader = () => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  const [quantity, setQuantity] = useState([]);
  const [show, toggleShow] = dailyTradeModalStores((state) => [
    state.show,
    state.toggleShow,
  ]);
  const user = useContext(AppContext).account[0];
  const trades = useQuery(["dailyTrades"], getTrades());
  const tradeMutation = useMutation(
    (index) =>
      isApproved
        ? tradeItemApproved(index, quantity[index], user)
        : tradeItemNotApproved(index, quantity[index], user),
    tradeSides()
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
            className="container h-75 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <BackButton onClick={toggleShow} />
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
                  {trades.data?.map((trade, index) => (
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
      )}
    </AnimatePresence>
  );
};

export default DailyTrader;
