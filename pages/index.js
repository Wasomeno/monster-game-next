import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MapButton from "../components/Buttons/MapButton";

const Map = () => {
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
    const mapImage = new Image();
    mapImage.src = "/canvas_images/map.png";
    mapImage.onload = () => {
      setImage(mapImage);
    };
  }, []);

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

  return (
    <AnimatePresence>
      <motion.div
        className="relative h-screen w-screen bg-sea-blue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 1 }}
      >
        <div className="h-screen flex justify-center items-center">
          <canvas ref={canvasRef} className="h-screen w-screen" />
        </div>
        <MapButton link={"cityhall"} y={"240px"} x={"53%"} />
        <MapButton link={"dungeon"} y={"500px"} x={"24.5%"} />
        <MapButton link={"nursery"} y={"490px"} x={"72.5%"} />
        <MapButton link={"altar"} y={"220px"} x={"27.5%"} />
      </motion.div>
    </AnimatePresence>
  );
};

export default Map;
