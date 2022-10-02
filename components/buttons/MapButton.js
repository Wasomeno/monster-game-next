import { motion } from "framer-motion";
import Link from "next/link";

const MapButton = ({ link, x, y }) => {
  const buttonText = new Map([
    ["cityhall", "City Hall"],
    ["dungeon", "Dungeon &  Missions"],
    ["altar", "Altar"],
    ["nursery", "Nursery & Smelter"],
  ]);

  return (
    <motion.div
      className="col-4"
      initial={{ top: y }}
      animate={{ top: `calc(${y} + 10px)` }}
      transition={{
        repeat: "Infinity",
        repeatType: "reverse",
        duration: 1,
      }}
      style={{
        top: "240px",
        right: x,
        transform: "translate(50%, -50%)",
        position: "absolute",
      }}
    >
      <Link href={link}>
        <a id="map-button">
          <div id="action-button">
            <span id="button-text">{buttonText.get(link)}</span>
          </div>
        </a>
      </Link>
    </motion.div>
  );
};

export default MapButton;
