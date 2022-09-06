import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import NotConnected from "../components/NotConnected";
import NurseryModal from "../components/NurseryModal";
import SmelterModal from "../components/SmelterModal";
import AppContext from "../components/AppContext";

const Nursery = () => {
  const connection = useContext(AppContext);
  const isConnected = Boolean(connection.account[0]);
  const [showNursery, setShowNursery] = useState(false);
  const [showSmelter, setShowSmelter] = useState(false);
  const [image, setImage] = useState(null);
  const canvasRef = useRef(null);

  const drawCanvas = (context, xOffset, yOffset, newWidth, newHeight) => {
    context.drawImage(image, xOffset, yOffset, newWidth, newHeight);
  };

  useEffect(() => {
    if (isConnected) {
      const nurseryImage = new Image();
      nurseryImage.src = "/hall.png";
      nurseryImage.onload = () => {
        setImage(nurseryImage);
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
        newHeight < canvas.height ? (canvas.height - newHeight) / 2 : 0;
      drawCanvas(c, xOffset, yOffset, newWidth, newHeight);
    }
  }, [drawCanvas]);

  return (
    <motion.div
      id="nursery-container"
      className="container-fluid h-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 1 }}
    >
      {isConnected ? (
        <>
          <canvas
            ref={canvasRef}
            className="nursery-canvas"
            width={1000}
            height={window.innerHeight}
          />
          <div id="nursery-buttons" className="row justify-content-center">
            <div className="col-3">
              <button
                id="nursery-button"
                className="btn btn-primary"
                onClick={() => setShowNursery(true)}
              >
                Nursery
              </button>
            </div>
            <div className="col-3">
              <button
                id="smelter-button"
                className="btn btn-primary"
                onClick={() => setShowSmelter(true)}
              >
                Smelter
              </button>
            </div>
          </div>
          <NurseryModal
            showNursery={showNursery}
            setShowNursery={setShowNursery}
          />
          <SmelterModal
            showSmelter={showSmelter}
            setShowSmelter={setShowSmelter}
          />
        </>
      ) : (
        <NotConnected />
      )}
    </motion.div>
  );
};

export default Nursery;
