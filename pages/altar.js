import React, { useEffect, useRef, useState, useContext } from "react";
import { motion } from "framer-motion";
import AppContext from "../components/AppContext";
import NotConnected from "../components/NotConnected";
import AltarModal from "../components/AltarModal";

const Altar = () => {
  const connection = useContext(AppContext);
  const isConnected = Boolean(connection.account[0]);
  const [showAltar, setShowAltar] = useState(false);
  const [image, setImage] = useState(null);
  const canvasRef = useRef(null);

  const drawCanvas = (context, xOffset, yOffset, newWidth, newHeight) => {
    context.drawImage(image, xOffset, yOffset, newWidth, newHeight);
  };

  useEffect(() => {
    if (isConnected) {
      const altarImage = new Image();
      altarImage.src = "/Altar.png";
      altarImage.onload = () => {
        setImage(altarImage);
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
      className="container-fluid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 1 }}
    >
      {isConnected ? (
        <>
          <canvas ref={canvasRef} width={1000} height={window.innerHeight} />
          <div id="altar-buttons" className="row justify-content-center">
            <div className="col-3">
              <button
                id="altar-button"
                className="btn btn-primary"
                onClick={() => setShowAltar(true)}
              >
                Altar
              </button>
            </div>
          </div>
          <AltarModal showAltar={showAltar} setShowAltar={setShowAltar} />
        </>
      ) : (
        <NotConnected />
      )}
    </motion.div>
  );
};

export default Altar;
