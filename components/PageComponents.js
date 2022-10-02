import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useToggle from "../hooks/useToggle";
import DungeonModal from "./DungeonModal";
import MissionsModal from "./MissionsModal";
import NurseryModal from "./NurseryModal";
import SmelterModal from "./SmelterModal";
import CityHallModal from "./CityHallModal";
import AltarModal from "./AltarModal";
import ModalButton from "./buttons/ModalButton";

const PageComponents = ({ path }) => {
  const Nursery = () => {
    const [showSmelter, toggleShowSmelter] = useToggle(false);
    const [showNursery, toggleShowNursery] = useToggle(false);
    return (
      <>
        <ModalButton
          text={"Nursery"}
          y={"370px"}
          x={"125px"}
          onClick={toggleShowNursery}
        />
        <ModalButton
          text={"Smelter"}
          y={"380px"}
          x={"720px"}
          onClick={toggleShowSmelter}
        />
        <NurseryModal
          showNursery={showNursery}
          toggleShowNursery={toggleShowNursery}
        />
        <SmelterModal
          showSmelter={showSmelter}
          toggleShowSmelter={toggleShowSmelter}
        />
      </>
    );
  };

  const Dungeon = () => {
    const [showDungeon, toggleShowDungeon] = useToggle(false);
    const [showMission, toggleShowMission] = useToggle(false);
    return (
      <>
        <ModalButton
          text={"Dungeon"}
          y={"400px"}
          x={"450px"}
          onClick={toggleShowDungeon}
        />

        <ModalButton
          text={"Mission"}
          y={"320px"}
          x={"580px"}
          onClick={toggleShowMission}
        />

        <DungeonModal
          showDungeon={showDungeon}
          toggleShowDungeon={toggleShowDungeon}
        />
        <MissionsModal
          showMission={showMission}
          toggleShowMission={toggleShowMission}
        />
      </>
    );
  };

  const CityHall = () => {
    const [showShop, toggleShowShop] = useToggle(false);
    const [showTrader, toggleShowTrader] = useToggle(false);
    return (
      <>
        <ModalButton
          text={"Trader"}
          y={"380px"}
          x={"130px"}
          onClick={toggleShowTrader}
        />
        <ModalButton
          text={"Shop"}
          y={"380px"}
          x={"735px"}
          onClick={toggleShowShop}
        />
        <CityHallModal
          showShop={showShop}
          showTrader={showTrader}
          toggleShowShop={toggleShowShop}
          toggleShowTrader={toggleShowTrader}
        />
      </>
    );
  };

  const Altar = () => {
    const [showAltar, toggleShowAltar] = useToggle(false);
    return (
      <>
        <ModalButton
          text={"Altar"}
          y={"490px"}
          x={"540px"}
          onClick={toggleShowAltar}
        />

        <AltarModal showAltar={showAltar} toggleShowAltar={toggleShowAltar} />
      </>
    );
  };

  const components = new Map([
    ["/nursery", <Nursery />],
    ["/dungeon", <Dungeon />],
    ["/cityhall", <CityHall />],
    ["/altar", <Altar />],
  ]);

  useEffect(() => {}, [path]);

  return components.get(path);
};

export default PageComponents;
