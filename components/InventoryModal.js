import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import MoonLoader from "react-spinners/MoonLoader";
import { itemsContract } from "../helpers/contractConnection";
import AppContext from "./AppContext";

function InventoryModal({ showInventory, setShowInventory }) {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const connection = useContext(AppContext);
  const items = itemsContract();

  async function getInventory() {
    setLoading(true);
    await items.getInventory(connection.account[0]).then((response) => {
      setInventory(response);
    });
    setLoading(false);
  }

  useEffect(() => {
    getInventory();
  }, []);

  if (!showInventory) return;
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
        <div className="d-flex flex-wrap justify-content-center p-3">
          {loading ? (
            <MoonLoader size={50} loading={loading} />
          ) : inventory.length < 1 ? (
            <h5 className="m-0" id="modal-title">
              No items in inventory
            </h5>
          ) : (
            inventory.map((item, index) => (
              <>
                <div
                  id="inventory-card"
                  className="card col-4 col-sm-2 col-lg-2 m-1 p-2 d-flex flex-column justify-content-center align-items-center"
                  key={index}
                  style={{ backgroundColor: "#D8CCA3" }}
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
                    <h5 className="card-title" id="modal-title">
                      {index === 0
                        ? "Gold Coins"
                        : index === 1
                        ? "Berry"
                        : index === 2
                        ? "Hunger Potion"
                        : index === 3
                        ? "Exp Potion"
                        : index === 4
                        ? "Token Crystal"
                        : ""}{" "}
                    </h5>
                  </div>
                </div>
              </>
            ))
          )}
        </div>
      </motion.div>
    </>
  );
}

export default InventoryModal;
