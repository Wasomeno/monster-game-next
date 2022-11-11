import React, { useEffect } from "react";
import DungeonModal from "./modals/DungeonModal";
import MissionsModal from "./modals/MissionsModal";
import NurseryModal from "./modals/NurseryModal";
import SmelterModal from "./modals/SmelterModal";
import AltarModal from "./modals/AltarModal";
import ModalButton from "./buttons/ModalButton";
import DailyShopModal from "./modals/DailyShopModal";
import DailyTrader from "./modals/DailyTrader";
import {
  altarModalStores,
  dailyShopModalStores,
  dailyTradeModalStores,
  dungeonModalStores,
  missionsModalStores,
  nurseryModalStores,
  smelterModalStores,
} from "../stores/modalStores";

const PageComponents = ({ path }) => {
  const toggleShowDungeon = dungeonModalStores((state) => state.toggleShow);
  const toggleShowMission = missionsModalStores((state) => state.toggleShow);
  const toggleShowShop = dailyShopModalStores((state) => state.toggleShow);
  const toggleShowTrader = dailyTradeModalStores((state) => state.toggleShow);
  const toggleShowSmelter = smelterModalStores((state) => state.toggleShow);
  const toggleShowNursery = nurseryModalStores((state) => state.toggleShow);
  const toggleShowAltar = altarModalStores((state) => state.toggleShow);

  const Dungeon = (
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

      <DungeonModal />
      <MissionsModal />
    </>
  );

  const Nursery = (
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
      <NurseryModal />
      <SmelterModal />
    </>
  );

  const CityHall = (
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
      <DailyShopModal />
      <DailyTrader />
    </>
  );

  const Altar = (
    <>
      <ModalButton
        text={"Altar"}
        y={"490px"}
        x={"540px"}
        onClick={toggleShowAltar}
      />

      <AltarModal />
    </>
  );

  const components = new Map([
    ["/nursery", Nursery],
    ["/dungeon", Dungeon],
    ["/cityhall", CityHall],
    ["/altar", Altar],
  ]);

  return components.get(path);
};

export default PageComponents;
