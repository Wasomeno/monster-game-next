import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import MoonLoader from "react-spinners/MoonLoader";
import AppContext from "../../contexts/AppContext";
import useToggle from "../../hooks/useToggle";
import { useQuery } from "@tanstack/react-query";
import { getInventory } from "../../fetchers/fetchers";

function InventoryModal({ showInventory, setShowInventory }) {
  if (!showInventory) return;
  const [loading, toggleLoading] = useToggle(false);
  const [activeItem, setActiveItem] = useState(0);
  const user = useContext(AppContext).account[0];
  const inventory = useQuery(["inventory"], getInventory(user));

  return (
    <>
      <motion.div
        id="modal-screen"
        className="h-100 w-100 bg-dark bg-opacity-75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      />
      <motion.div
        id="shop-modal"
        className="container w-75 h-75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      >
        <>
          <div className="row justify-content-center align-items-center">
            <div className="col-4">
              <img
                src="back_icon.png"
                alt="back-icon"
                width={"14%"}
                onClick={() => setShowInventory(false)}
              />
            </div>
            <div className="col-4">
              <h2 className="text-center p-3" id="modal-title">
                Inventory
              </h2>
            </div>
            <div className="col-4" />
          </div>
          <div className="d-flex justify-content-center align-items-center p-3 h-75">
            {inventory.isLoading ? (
              <MoonLoader size={50} loading={loading} color={"#eee"} />
            ) : (
              <>
                <div className="col-8 d-flex flex-wrap justify-content-start align-items-start h-100">
                  {inventory.data && inventory.data?.length < 1 ? (
                    <h5 className="m-0" id="modal-title">
                      No items in inventory
                    </h5>
                  ) : (
                    inventory.data?.map((item, index) => (
                      <div
                        key={index}
                        id="inventory-card"
                        className="card h-50 col-3 m-1 p-2 d-flex flex-column justify-content-center align-items-center"
                        onClick={() => setActiveItem(index)}
                        style={{
                          backgroundColor:
                            activeItem === index ? "#423f3e" : "#2b2b2b",
                        }}
                      >
                        <div className="align-self-end p-2">
                          <h5 className="m-0" id="modal-title">
                            x{item.toString()}
                          </h5>
                        </div>
                        <img
                          src={index + ".png"}
                          alt="items-img"
                          width={"40%"}
                          className="p-2"
                        />
                        <div>
                          <h5 className="card-title text-white" id="text">
                            {index === 0
                              ? "Gold Coins"
                              : index === 1
                              ? "Berry"
                              : index === 2
                              ? "Energy Potion"
                              : index === 3
                              ? "Exp Potion"
                              : index === 4
                              ? "Token Crystal"
                              : ""}{" "}
                          </h5>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="col-4 bg-light bg-opacity-25 h-100 rounded">
                  <div className="row justify-content-center">
                    <h3
                      id="modal-title"
                      className="m-0 p-2 text-white text-center"
                    >
                      Item Details
                    </h3>
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <h3 id="text" className="text-white">
                      {activeItem === 0
                        ? "Gold Coins"
                        : activeItem === 1
                        ? "Berry"
                        : activeItem === 2
                        ? "Hunger Potion"
                        : activeItem === 3
                        ? "Exp Potion"
                        : activeItem === 4
                        ? "Token Crystal"
                        : ""}{" "}
                    </h3>
                    <img
                      src={activeItem + ".png"}
                      width={"80px"}
                      className="p-3 m-3 border border-dark border-1 rounded"
                      alt="shop-item-img"
                      style={{ backgroundColor: "#fee0c0" }}
                    />
                    <div className="row justify-content-center align-items-center"></div>
                    <button
                      id="text"
                      className={
                        activeItem !== 2 && activeItem !== 3
                          ? "btn btn-primary m-3 disabled"
                          : "btn btn-primary m-3"
                      }
                      onClick={() => setShowUseItem(true)}
                    >
                      <h5 className="m-0 px-2">Use Item</h5>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      </motion.div>
    </>
  );
}

export default InventoryModal;
