import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useToggle from "../hooks/useToggle";
import DungeonModal from "./DungeonModal";
import MissionsModal from "./MissionsModal";
import NurseryModal from "./NurseryModal";
import SmelterModal from "./SmelterModal";
import CityHallModal from "./CityHallModal";
import AltarModal from "./AltarModal";

const PageComponents = ({ path }) => {
  const [showNursery, toggleShowNursery] = useToggle(false);
  const [showDungeon, toggleShowDungeon] = useToggle(false);
  const [showMission, toggleShowMission] = useToggle(false);
  const [showShop, toggleShowShop] = useToggle(false);
  const [showTrader, toggleShowTrader] = useToggle(false);
  const [showAltar, toggleShowAltar] = useToggle(false);
  const [showSmelter, toggleShowSmelter] = useToggle(false);
  const components = new Map([
    [
      "/nursery",
      <>
        <div id="nursery-buttons" className="row justify-content-center">
          <motion.div
            id="nursery-button"
            className="col-3"
            initial={{ bottom: "45%" }}
            animate={{ bottom: "46%" }}
            transition={{
              repeat: "Infinity",
              repeatType: "reverse",
              duration: 1,
            }}
          >
            <button onClick={toggleShowNursery}>
              <div id="npc-button">
                <span id="npc-button-text">Nursery</span>
              </div>
            </button>
          </motion.div>
          <motion.div
            id="smelter-button"
            className="col-3"
            initial={{ bottom: "43%" }}
            animate={{ bottom: "44%" }}
            transition={{
              repeat: "Infinity",
              repeatType: "reverse",
              duration: 1,
            }}
          >
            <button onClick={toggleShowSmelter}>
              <div id="npc-button">
                <span id="npc-button-text">Smelter</span>
              </div>
            </button>
          </motion.div>
        </div>
        <NurseryModal
          showNursery={showNursery}
          toggleShowNursery={toggleShowNursery}
        />
        <SmelterModal
          showSmelter={showSmelter}
          toggleShowSmelter={toggleShowSmelter}
        />
      </>,
    ],
    [
      "/dungeon",
      <>
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
          <button onClick={toggleShowDungeon}>
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
          <button onClick={toggleShowDungeon}>
            <div id="npc-button">
              <span id="npc-button-text">Missions</span>
            </div>
          </button>
        </motion.div>
        <DungeonModal
          showDungeon={showDungeon}
          toggleShowDungeon={toggleShowDungeon}
        />
        <MissionsModal
          showMission={showMission}
          toggleShowMission={toggleShowMission}
        />
      </>,
    ],
    [
      "/cityhall",
      <>
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
          <button id="trader-button" onClick={toggleShowTrader}>
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
          <button onClick={toggleShowShop}>
            <div id="npc-button">
              <span id="npc-button-text">Shop</span>
            </div>
          </button>
        </motion.div>
        <CityHallModal
          showShop={showShop}
          showTrader={showTrader}
          toggleShowShop={toggleShowShop}
          toggleShowTrader={toggleShowTrader}
        />
      </>,
    ],
    [
      "/altar",
      <>
        <div id="altar-buttons" className="row justify-content-center">
          <div className="col-3">
            <button
              id="altar-button"
              className="btn btn-primary"
              onClick={toggleShowAltar}
            >
              Altar
            </button>
          </div>
        </div>
        <AltarModal showAltar={showAltar} toggleShowAltar={toggleShowAltar} />
      </>,
    ],
  ]);

  useEffect(() => {
    console.log(path);
  }, [path]);
  return components.get(path);
};

export default PageComponents;
