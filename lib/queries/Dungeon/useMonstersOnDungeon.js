import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAccount } from "wagmi";
import { dungeonContract } from "../../../hooks/useContract";
import { config } from "../queryConfig";

const useMonstersOnDungeon = () => {
  const { address: user } = useAccount();
  const dungeonHandler = dungeonContract();
  const monsters = useQuery(
    ["monsterOnDungeon", user],
    async () => await dungeonHandler.getMonstersOnDungeon(user),
    config
  );
  return monsters;
};

export default useMonstersOnDungeon;
