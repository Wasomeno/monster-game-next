import { useQuery } from "@tanstack/react-query";
import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { getMonsterDetails } from "../../fetchers/fetchers";
import { Paragraph } from "../Texts";
import statuses from "./statusMap";

const MonsterStats = ({ monster }) => {
  const monsterDetails = useQuery(
    ["monsterDetails", monster],
    getMonsterDetails(monster)
  );

  return (
    <div className="w-7/12">
      <div className="flex items-center justify-evenly">
        <div className="w-5/12">
          <Paragraph>Level :</Paragraph>
        </div>
        <div className="w-5/12 text-center">
          <Paragraph>{monsterDetails.data?.level} / 10</Paragraph>
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <div className="w-5/12">
          <Paragraph>Energy :</Paragraph>
        </div>
        <div className="w-5/12 text-center">
          <Paragraph>
            {monsterDetails.data?.energy} /{monsterDetails.data?.energyCap}
          </Paragraph>
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <div className="w-5/12">
          <Paragraph>Exp :</Paragraph>
        </div>
        <div className="w-5/12 text-center">
          <Paragraph>
            {monsterDetails.data?.exp} / {monsterDetails.data?.expCap}
          </Paragraph>
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <div className="w-5/12">
          <Paragraph>Status :</Paragraph>
        </div>
        <div className="w-5/12 text-center">
          <Paragraph>{statuses.get(monsterDetails.data?.status)}</Paragraph>
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <div className="w-5/12">
          <Paragraph>Cooldown : </Paragraph>
        </div>
        <div className="w-5/12 text-center">
          <Paragraph>
            {monsterDetails.data?.cooldown > Date.now() / 1000
              ? "On Cooldown"
              : "Cooldown finished"}
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default MonsterStats;
