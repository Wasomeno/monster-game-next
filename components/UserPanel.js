import { parseBytes32String } from "ethers/lib/utils";
import InventoryModal from "./Inventory/InventoryModal";
import MonstersModal from "./Monsters/MonstersModal";
import Image from "next/image";
import useItemAmount from "../lib/queries/useItemAmount";
import useUserDetails from "../lib/queries/useUserDetails";
import useToggle from "../hooks/useToggle";

const defaultUserData = {
  name: "Unknown",
};

const UserPanelLoading = () => {
  return (
    <div className="h-96 w-60 flex flex-col justify-start items-center rounded absolute z-5 left-5 top-5 shadow-sm bg-slate-600 animate-pulse">
      <div className="h-8 w-36 rounded shadow-md bg-slate-500 m-2 animate-pulse" />
      <div className="h-44 w-36 rounded shadow-md bg-slate-500 m-2 animate-pulse" />

      <div className="h-8 w-36 rounded shadow-md bg-slate-500 m-2 animate-pulse" />
      <div className="h-8 w-36 rounded shadow-md bg-slate-500 m-2 animate-pulse" />
    </div>
  );
};

const UserPanel = () => {
  const { data: userDetails, isFetching, isError } = useUserDetails();
  const [showInventory, toggleShowInventory] = useToggle(false);
  const [showMonsters, toggleShowMonsters] = useToggle(false);
  const gold = useItemAmount({ item: 0 });

  function bytesToString(string) {
    return parseBytes32String(string);
  }

  return isFetching ? (
    <UserPanelLoading />
  ) : (
    <>
      <div className="h-96 w-60 flex flex-col justify-start items-center rounded absolute z-5 left-5 top-5 shadow-sm bg-slate-600 bg-opacity-40">
        <h5 className="p-1 text-white font-monogram text-2xl tracking-wide m-1">
          {!bytesToString(userDetails.name)
            ? defaultUserData.name
            : bytesToString(userDetails.name)}
        </h5>
        <div className="border rounded-md border-slate-400 bg-opacity-25 p-2">
          <Image
            src={
              "/profile/profile_" +
              bytesToString(userDetails.profile_image) +
              ".png"
            }
            width="100"
            height="120"
            priority={true}
            quality={100}
            className="m-0"
          />
        </div>
        <h5 className="p-1 m-1 text-white text-center font-monogram tracking-wide text-xl ">
          Gold: {parseInt(gold.data)}
        </h5>
        <div id="user-menu" className="flex flex-col">
          <button
            className="bg-slate-900 p-2 px-3 rounded-lg flex items-center my-1"
            onClick={() => toggleShowInventory()}
          >
            <img
              src="/icons/bag_icon.png"
              className="m-1"
              alt="inventory-icon"
              width={"18px"}
            />
            <p className="p-1 text-white font-monogram tracking-wide text-lg">
              Inventory
            </p>
          </button>
          <button
            className="bg-slate-900 p-2 px-3 rounded-lg flex items-center my-1"
            onClick={() => toggleShowMonsters()}
          >
            <img
              src="/icons/bag_icon.png"
              className="m-1"
              alt="inventory-icon"
              width={"18px"}
            />
            <h5 className="p-1 text-white font-monogram tracking-wide text-lg">
              Monsters
            </h5>
          </button>
        </div>
      </div>

      {showInventory && (
        <InventoryModal
          showInventory={showInventory}
          toggleShowInventory={toggleShowInventory}
        />
      )}

      {showMonsters && (
        <MonstersModal
          showMonsters={showMonsters}
          toggleShowMonsters={toggleShowMonsters}
        />
      )}
    </>
  );
};

export default UserPanel;
