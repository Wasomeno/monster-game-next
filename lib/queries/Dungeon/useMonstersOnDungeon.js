import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAccount } from "wagmi";
import { dungeonContract } from "../../../hooks/useContract";

const useMonstersOnDungeon = () => {
  const { address: user } = useAccount();
  const dungeonHandler = dungeonContract();
  const { data, isLoading, isError } = useQuery(
    ["monstersOnMission", user],
    async () => await dungeonHandler.getMonstersOnDungeon(user)
  );
  return { data: data, isLoading: isLoading, isError: isError };
};

export default useMonstersOnDungeon;
