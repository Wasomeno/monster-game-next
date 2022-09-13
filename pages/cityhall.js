import React, { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../components/AppContext";
import { motion } from "framer-motion";
import NotConnected from "../components/NotConnected";
import CityHallModal from "../components/CityHallModal";

const CityHall = () => {
  const connection = useContext(AppContext);
  const isConnected = Boolean(connection.account[0]);
  const [shopShow, setShopShow] = useState(false);
  const [traderShow, setTraderShow] = useState(false);
  const [image, setImage] = useState(null);
  const canvasRef = useRef(null);

  const drawCanvas = (context, xOffset, yOffset, newWidth, newHeight) => {
    context.drawImage(image, xOffset, yOffset, newWidth, newHeight);
  };

  useEffect(() => {
    if (isConnected) {
      const hallImage = new Image();
      hallImage.src = "/hall.png";
      hallImage.onload = () => {
        setImage(hallImage);
      };
    }
  }, [isConnected]);

  useEffect(() => {
    if (image && canvasRef) {
      const canvas = canvasRef.current;
      const c = canvas.getContext("2d");
      var wrh = image.width / image.height;
      var newWidth = canvas.width;
      var newHeight = newWidth / wrh;
      if (newHeight > canvas.height) {
        newHeight = canvas.height;
        newWidth = newHeight * wrh;
      }
      var xOffset = newWidth < canvas.width ? (canvas.width - newWidth) / 2 : 0;
      var yOffset =
        newHeight < canvas.height ? (canvas.height - newHeight) / 3 : 0;
      drawCanvas(c, xOffset, yOffset, newWidth, newHeight);
    }
  }, [drawCanvas]);

  if (!isConnected) return;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 1.25 }}
    >
      <div className="d-flex justify-content-center align-items-center">
        <canvas ref={canvasRef} width={1000} height={window.innerHeight} />
      </div>

      <motion.div
        id="trader-button"
        className="col-3"
        initial={{ bottom: "47%" }}
        animate={{ bottom: "48%" }}
        transition={{
          repeat: "Infinity",
          repeatType: "reverse",
          duration: 1,
        }}
      >
        <button id="trader-button" onClick={() => setTraderShow(true)}>
          <div id="npc-button">
            <span id="npc-button-text">Trader</span>
          </div>
        </button>
      </motion.div>
      <motion.div
        id="shop-button"
        className="col-3"
        initial={{ bottom: "47%" }}
        animate={{ bottom: "48%" }}
        transition={{
          repeat: "Infinity",
          repeatType: "reverse",
          duration: 1,
        }}
      >
        <button onClick={() => setShopShow(true)}>
          <div id="npc-button">
            <span id="npc-button-text">Shop</span>
          </div>
        </button>
      </motion.div>
      <CityHallModal
        shopShow={shopShow}
        traderShow={traderShow}
        setShopShow={setShopShow}
        setTraderShow={setTraderShow}
      />
    </motion.div>
  );
};

export default CityHall;
