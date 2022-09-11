import React, { useEffect, useRef, useState, useContext } from "react";
import { motion } from "framer-motion";
import NotConnected from "../components/NotConnected";
import AppContext from "../components/AppContext";
import Link from "next/link";

const Map = () => {
  const connection = useContext(AppContext);
  const isConnected = Boolean(connection.account[0]);
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);

  const drawCanvas = (
    canvas,
    context,
    xOffset,
    yOffset,
    newWidth,
    newHeight
  ) => {
    context.drawImage(image, xOffset, yOffset, newWidth, newHeight);
  };

  useEffect(() => {
    if (isConnected) {
      const mapImage = new Image();
      mapImage.src = "Map.png";
      mapImage.onload = () => {
        setImage(mapImage);
      };
    }
  }, [isConnected]);

  useEffect(() => {
    if (image && canvasRef) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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
      drawCanvas(canvas, c, xOffset, yOffset, newWidth, newHeight);
    }
  }, [drawCanvas]);

  if (!isConnected) return;

  return (
    <motion.div
      id="map-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 1 }}
    >
      <>
        <canvas ref={canvasRef} className="map-canvas" />
        <div id="map-buttons">
          <motion.div
            className="col-4"
            initial={{ top: "32.5%" }}
            animate={{ top: "31.5%" }}
            transition={{
              repeat: "Infinity",
              repeatType: "reverse",
              duration: 1,
            }}
          >
            <Link href="/cityhall">
              <a id="map-button">
                <div id="action-button">
                  <span id="button-text">City Hall</span>
                </div>
              </a>
            </Link>
          </motion.div>
          <motion.div
            className="col-4"
            initial={{ bottom: "32.5%" }}
            animate={{ bottom: "31.5%" }}
            transition={{
              repeat: "Infinity",
              repeatType: "reverse",
              duration: 1,
            }}
          >
            <Link href="/dungeon">
              <a id="map-button">
                <div id="action-button">
                  <span id="button-text">Dungeon & Missions</span>
                </div>
              </a>
            </Link>
          </motion.div>
          <motion.div
            className="col-4"
            initial={{ bottom: "33.5%" }}
            animate={{ bottom: "32.5%" }}
            transition={{
              repeat: "Infinity",
              repeatType: "reverse",
              duration: 1,
            }}
          >
            <Link href="/nursery">
              <a id="map-button">
                <div id="action-button">
                  <span id="button-text">Nursery & Smelter</span>
                </div>
              </a>
            </Link>
          </motion.div>
          <motion.div
            className="col-4"
            initial={{ top: "25%" }}
            animate={{ top: "26%" }}
            transition={{
              repeat: "Infinity",
              repeatType: "reverse",
              duration: 1,
            }}
          >
            <Link href="/altar">
              <a id="map-button">
                <div id="action-button">
                  <span id="button-text">Summoning Altar</span>
                </div>
              </a>
            </Link>
          </motion.div>
        </div>
      </>
    </motion.div>
  );
};

export default Map;
