import ModalButton from "./Buttons/ModalButton";
import DungeonModal from "./Dungeon/DungeonModal";
import MissionsModal from "./Mission/MissionsModal";
import NurseryModal from "./Nursery/NurseryModal";
import SmelterModal from "./Smelter/SmelterModal";
import AltarModal from "./Altar/AltarModal";
import DailyShopModal from "./DailyShop/DailyShopModal";
import DailyTrader from "./DailyTrader/DailyTrader";
import MonstersActivityModal from "./MonstersActivityModal";
import useToggle from "../hooks/useToggle";
import Modal from "./Modal";

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
          Child={MissionsModal}
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

  const components = new Map([
    ["/nursery", <Nursery />],
    ["/dungeon", <Dungeon />],
    ["/cityhall", <CityHall />],
    ["/altar", <Altar />],
  ]);

  return components.get(path);
};

export default PageComponents;
