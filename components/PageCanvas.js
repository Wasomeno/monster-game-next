import React, { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../contexts/AppContext";
import PageComponents from "./PageComponents";
import { AnimatePresence, motion } from "framer-motion";
import RegisterModal from "./modals/RegisterModal";

const PageCanvas = ({ path }) => {
  const connection = useContext(AppContext);
  const isConnected = Boolean(connection.account[0]);
  const [image, setImage] = useState(null);
  const canvasRef = useRef(null);

  const drawCanvas = (context, xOffset, yOffset, newWidth, newHeight) => {
    context.drawImage(image, xOffset, yOffset, newWidth, newHeight);
  };

  useEffect(() => {
    if (isConnected) {
      const image = new Image();
      image.src = "/canvas_images/" + path + ".png";
      image.onload = () => {
        setImage(image);
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

  return (
    <AnimatePresence>
      <motion.div
        className="container-fluid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 1 }}
      >
        <div className="d-flex justify-content-center align-items-center">
          <canvas ref={canvasRef} width={1000} height={window.innerHeight} />
        </div>
        <PageComponents path={path} />
      </motion.div>
    </AnimatePresence>
  );
};

export default PageCanvas;
