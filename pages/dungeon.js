import React, { useContext, useEffect, useRef, useState } from "react";
import { calcLength, motion } from "framer-motion";
import NotConnected from "../components/NotConnected";
import DungeonModal from "../components/DungeonModal";
import AppContext from "../components/AppContext";

const Dungeon = () => {
  const connection = useContext(AppContext);
  const isConnected = Boolean(connection.account[0]);
  const [showDungeon, setShowDungeon] = useState(false);
  const [showMission, setShowMission] = useState(false);
  const [image, setImage] = useState(null);
  const canvasRef = useRef(null);

  const drawCanvas = (context, xOffset, yOffset, newWidth, newHeight) => {
    context.drawImage(image, xOffset, yOffset, newWidth, newHeight);
  };

  useEffect(() => {
    if (isConnected) {
      const dungeonImage = new Image();
      dungeonImage.src = "/dungeon.png";
      dungeonImage.onload = () => {
        setImage(dungeonImage);
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
      transition={{ type: "tween", duration: 1 }}
    >
      <div className="d-flex justify-content-center align-items-center">
        <canvas ref={canvasRef} width={1000} height={window.innerHeight} />
      </div>

      <motion.div
        id="dungeon-button"
        className="col-2"
        initial={{ bottom: "40%" }}
        animate={{ bottom: "41%" }}
        transition={{
          repeat: "Infinity",
          repeatType: "reverse",
          duration: 1,
        }}
      >
        <button onClick={() => setShowDungeon(true)}>
          <div id="npc-button">
            <span id="npc-button-text">Dungeon</span>
          </div>
        </button>
      </motion.div>
      <motion.div
        id="mission-button"
        className="col-2"
        initial={{ bottom: "52%" }}
        animate={{ bottom: "51%" }}
        transition={{
          repeat: "Infinity",
          repeatType: "reverse",
          duration: 1,
        }}
      >
        <button onClick={() => setShowMission(true)}>
          <div id="npc-button">
            <span id="npc-button-text">Missions</span>
          </div>
        </button>
      </motion.div>
      <DungeonModal
        showDungeon={showDungeon}
        showMission={showMission}
        setShowDungeon={setShowDungeon}
        setShowMission={setShowMission}
      />
    </motion.div>
  );
};

export default Dungeon;
