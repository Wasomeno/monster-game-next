import { parseBytes32String } from "ethers/lib/utils";
import InventoryModal from "./Inventory/InventoryModal";
import MonstersModal from "./Monsters/MonstersModal";
import RegisterModal from "./Register/RegisterModal";
import Image from "next/image";
import useItemAmount from "../fetchers/useItemAmount";
import useUserDetails from "../fetchers/useUserDetails";
import useToggle from "../hooks/useToggle";

const UserPanel = () => {
  const { data: userDetails, isLoading, isError } = useUserDetails();
  const [showInventory, toggleShowInventory] = useToggle(false);
  const [showMonsters, toggleShowMonsters] = useToggle(false);
  const gold = useItemAmount({ item: 0 });

  function bytesToString(string) {
    return parseBytes32String(string);
  }

  if (isLoading) return;
  return userDetails?.status ? (
    <>
      <div className="h-96 w-60 flex flex-col justify-start items-center rounded absolute z-5 left-5 top-5 shadow-sm bg-slate-600 bg-opacity-40">
        <h5 className="p-1 text-white font-monogram text-2xl tracking-wide m-1">
          {isLoading ? "loading....." : bytesToString(userDetails.name)}
        </h5>
        <div className="border rounded-md border-slate-400 bg-opacity-25 p-2">
          {isLoading ? (
            <h5>Loading</h5>
          ) : (
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
          )}
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
  ) : (
    <RegisterModal status={userDetails.status} />
  );
};

export default UserPanel;
