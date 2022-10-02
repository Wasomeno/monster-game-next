import React, { useEffect, useRef, useState, useContext } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import AppContext from "../components/AppContext";
import Link from "next/link";
import MapButton from "../components/buttons/MapButton";

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
      mapImage.src = "/canvas_images/map.png";
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
    <>
      <motion.div
        id="map-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 1 }}
      >
        <div className="d-flex justify-content-center align-items-center">
          <canvas ref={canvasRef} className="map-canvas" />
        </div>
        <MapButton link={"cityhall"} y={"240px"} x={"53%"} />
        <MapButton link={"dungeon"} y={"500px"} x={"24.5%"} />
        <MapButton link={"nursery"} y={"490px"} x={"72.5%"} />
        <MapButton link={"altar"} y={"220px"} x={"27.5%"} />
      </motion.div>
    </>
  );
};

export default Map;
