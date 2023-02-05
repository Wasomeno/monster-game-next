import { ethers } from "ethers";
import Image from "next/image";

import useItemAmount from "@/components/reactQuery/queries/useItemAmount";
import useUserDetails from "@/components/reactQuery/queries/useUserDetails";

import useToggle from "../hooks/useToggle";
import { InventoryModal } from "./InventoryModal";
import { MonstersModal } from "./MonstersModal";

const defaultUserData = {
  name: "Unknown",
};

const UserPanelLoading = () => {
  return (
    <div className="z-5 absolute left-5 top-5 flex h-96 w-60 animate-pulse flex-col items-center justify-start rounded bg-slate-600 shadow-sm">
      <div className="m-2 h-8 w-36 animate-pulse rounded bg-slate-500 shadow-md" />
      <div className="m-2 h-44 w-36 animate-pulse rounded bg-slate-500 shadow-md" />

      <div className="m-2 h-8 w-36 animate-pulse rounded bg-slate-500 shadow-md" />
      <div className="m-2 h-8 w-36 animate-pulse rounded bg-slate-500 shadow-md" />
    </div>
  );
};

const UserPanel = () => {
  const { data: userDetails, isFetching, isError } = useUserDetails();
  const [showInventory, toggleShowInventory] = useToggle(false);
  const [showMonsters, toggleShowMonsters] = useToggle(false);
  const gold = useItemAmount({ item: 0 });

  function bytesToString(string) {
    return ethers.utils.parseBytes32String(string);
  }

  return isFetching ? (
    <UserPanelLoading />
  ) : (
    <>
      <div className="z-5 absolute left-5 top-5 flex h-96 w-60 flex-col items-center justify-start rounded bg-slate-600 bg-opacity-40 shadow-sm">
        <h5 className="font-monogram m-1 p-1 text-2xl tracking-wide text-white">
          {!bytesToString(userDetails.name)
            ? defaultUserData.name
            : bytesToString(userDetails.name)}
        </h5>
        <div className="rounded-md border border-slate-400 bg-opacity-25 p-2">
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
            alt="profile-image
            "
          />
        </div>
        <h5 className="font-monogram m-1 p-1 text-center text-xl tracking-wide text-white ">
          Gold: {parseInt(gold.data)}
        </h5>
        <div id="user-menu" className="flex flex-col">
          <button
            className="my-1 flex items-center rounded-lg bg-slate-900 p-2 px-3"
            onClick={() => toggleShowInventory()}
          >
            <Image
              src="/icons/bag_icon.png"
              className="m-1"
              alt="inventory-icon"
              width="18"
              height="18"
            />
            <p className="font-monogram p-1 text-lg tracking-wide text-white">
              Inventory
            </p>
          </button>
          <button
            className="my-1 flex items-center rounded-lg bg-slate-900 p-2 px-3"
            onClick={() => toggleShowMonsters()}
          >
            <Image
              src="/icons/bag_icon.png"
              className="m-1"
              alt="inventory-icon"
              width="18"
              height="18"
            />
            <h5 className="font-monogram p-1 text-lg tracking-wide text-white">
              Monsters
            </h5>
          </button>
        </div>
      </div>
      <InventoryModal
        showInventory={showInventory}
        toggleShowInventory={toggleShowInventory}
      />
      <MonstersModal
        showMonsters={showMonsters}
        toggleShowMonsters={toggleShowMonsters}
      />
    </>
  );
};

export default UserPanel;
