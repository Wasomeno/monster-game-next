import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { getApprovalStatus, getCrystals } from "../../fetchers/fetchers";
import { smelt, smeltNotApproved } from "../../mutations/mutations";
import { StartActivityButton } from "../Buttons/Buttons";

const UserCrystalsSection = ({ user }) => {
  const [crystals, setCrystals] = useState(0);
  const crytalsInInventory = useQuery(
    ["crystalsInInventory", user],
    getCrystals(user)
  );

  const approvalStatus = useQuery(
    ["approvalStatus", process.env.SMELTER_CONTRACT_ADDRESS],
    getApprovalStatus(user, process.env.SMELTER_CONTRACT_ADDRESS)
  );

  const startSmelt = useMutation(() =>
    approvalStatus.data ? smelt(crystals) : smeltNotApproved(crystals)
  );
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
            value={crystals}
            onChange={(input) =>
              crystals > parseInt(crytalsInInventory.data)
                ? setCrystals(parseInt(crytalsInInventory.data))
                : setCrystals(input.target.value)
            }
          />
          <h5 className="m-0 p-2 text-white">
            / {crytalsInInventory.data?.toString()}
          </h5>
        </div>

        <h5 className="col-2 m-0 text-white">{">"}</h5>
      </div>
      <StartActivityButton text="Smelt" onClick={() => startSmelt.mutate()} />
    </div>
  );
};

export default UserCrystalsSection;
