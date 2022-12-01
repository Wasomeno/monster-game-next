import Image from "next/image";
import React, { useState } from "react";
import { useCrystals } from "../../fetchers/useSmelter";
import { useSmelt } from "../../mutations/smelterMutations";
import { StartActivityButton } from "../Buttons/Buttons";

const UserCrystalsSection = () => {
  const [crystalsAmount, setCrystalsAmount] = useState(0);
  const crystalsInInventory = useCrystals({ key: "inventory" });
  const startSmelt = useSmelt(crystalsAmount);

  return (
    <div className="w-4/12 text-center">
      <h5 className="m-0 text-white p-2">Your Crystals</h5>
      <div className="flex justify-around items-center my-2">
        <h5 className="m-0 text-white col-2">{"<"}</h5>
        <div className="flex justify-center items-center">
          <Image
            src="/items/4.png"
            width={"40"}
            height={"40"}
            alt="crystal-img"
            className="my-2"
          />
          <input
            type="text"
            className="w-4/12 text-center rounded m-0 mx-2 p-1"
            value={crystalsAmount}
            onChange={(input) =>
              crystalsAmount > parseInt(crystalsInInventory.data)
                ? setCrystalsAmount(parseInt(crystalsInInventory.data))
                : setCrystalsAmount(input.target.value)
            }
          />
          <h5 className="m-0 p-2 text-white">
            / {crystalsInInventory.data.toString()}
          </h5>
        </div>

        <h5 className="col-2 m-0 text-white">{">"}</h5>
      </div>
      <StartActivityButton text="Smelt" onClick={() => startSmelt()} />
    </div>
  );
};

export default UserCrystalsSection;
