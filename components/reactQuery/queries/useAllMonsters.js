import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { monsterContract } from "../../../hooks/useContract";
import { config } from "./queryConfig";

function useAllMonsters() {
  const { address: user } = useAccount();
  const monstersHandler = monsterContract();
  const { data, isLoading, isError } = useQuery(
    ["allMonsters", user],
    async () => {
      const monstersFetched = await monstersHandler.getMonsters(user);
      const monsters = await Promise.all(
        monstersFetched.map(async (monster) => {
          const { status } = await monstersHandler.monsterStats(monster);
          return { id: monster, status: status };
        })
      );
      return monsters;
    },
    config
  );

  return { data: data, isLoading: isLoading, isError: isError };
}

export default useAllMonsters;
