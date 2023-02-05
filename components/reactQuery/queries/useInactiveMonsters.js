import { useQuery } from "@tanstack/react-query";

import { monsterContract } from "../../../hooks/useContract";
import { config } from "./queryConfig";

function useInactiveMonsters(user) {
  const monstersHandler = monsterContract();
  const { data, isLoading, isError } = useQuery(
    ["inactiveMonsters", user],
    async () => {
      const monstersFetched = await monstersHandler.getMonsters(user);
      const inactiveMonsters = await Promise.all(
        monstersFetched.map(async (monster) => {
          const stats = await monstersHandler.monsterStats(monster);
          if (stats.status === 0) return { id: parseInt(monster), ...stats };
        })
      );
      return inactiveMonsters.filter((details) => {
        return details !== undefined;
      });
    },
    config
  );
  return { data: data, isLoading: isLoading, isError: isError };
}

export default useInactiveMonsters;
