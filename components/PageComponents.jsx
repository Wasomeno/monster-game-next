import AltarModal from "modules/altarPage/AltarModal";
import DailyShopModal from "modules/cityHallPage/DailyShopModal";
import DailyTrader from "modules/cityHallPage/DailyTraderModal";
import DungeonModal from "modules/dungeonMissionPage/DungeonModal";
import MissionModal from "modules/dungeonMissionPage/MissionModal";
import NurseryModal from "modules/nurseryPage/NurseryModal";
import SmelterModal from "modules/nurseryPage/SmelterModal";

import useToggle from "../hooks/useToggle";
import ModalButton from "./Buttons/ModalButton";
import Modal from "./Modal";
import MonstersActivityModal from "./MonstersActivityModal";

const PageComponents = ({ path }) => {
  const Dungeon = () => {
    const [showMission, toggleShowMission] = useToggle(false);
    const [showDungeon, toggleShowDungeon] = useToggle(false);
    return (
      <>
        <ModalButton
          text={"Dungeon"}
          y={"400px"}
          x={"660px"}
          onClick={() => toggleShowDungeon()}
        />

        <ModalButton
          text={"Mission"}
          y={"320px"}
          x={"800px"}
          onClick={() => toggleShowMission()}
        />

        <MonstersActivityModal
          Child={DungeonModal}
          show={showDungeon}
          toggleShow={toggleShowDungeon}
        />

        <MonstersActivityModal
          Child={MissionModal}
          show={showMission}
          toggleShow={toggleShowMission}
        />
      </>
    );
  };

  const Nursery = () => {
    const [showNursery, toggleShowNursery] = useToggle(false);
    const [showSmelter, toggleShowSmelter] = useToggle(false);
    return (
      <>
        <ModalButton
          text={"Nursery"}
          y={"370px"}
          x={"340px"}
          onClick={() => toggleShowNursery()}
        />
        <ModalButton
          text={"Smelter"}
          y={"380px"}
          x={"940px"}
          onClick={toggleShowSmelter}
        />
        <MonstersActivityModal
          Child={NurseryModal}
          show={showNursery}
          toggleShow={toggleShowNursery}
        />
        <Modal show={showSmelter} toggleShow={toggleShowSmelter}>
          <SmelterModal />
        </Modal>
      </>
    );
  };

  const CityHall = () => {
    const [showTrader, toggleShowTrader] = useToggle(false);
    const [showShop, toggleShowShop] = useToggle(false);
    return (
      <>
        <ModalButton
          text={"Trader"}
          y={"380px"}
          x={"360px"}
          onClick={toggleShowTrader}
        />
        <ModalButton
          text={"Shop"}
          y={"380px"}
          x={"980px"}
          onClick={toggleShowShop}
        />
        <Modal show={showShop} toggleShow={toggleShowShop}>
          <DailyShopModal />
        </Modal>

        <Modal show={showTrader} toggleShow={toggleShowTrader}>
          <DailyTrader />
        </Modal>
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
          x={"760px"}
          onClick={toggleShowAltar}
        />

        <Modal show={showAltar} toggleShow={toggleShowAltar}>
          <AltarModal />
        </Modal>
      </>
    );
  };

  const components = {
    "/nursery": <Nursery />,
    "/dungeon": <Dungeon />,
    "/cityhall": <CityHall />,
    "/altar": <Altar />,
  };

  return components[path];
};

export default PageComponents;
