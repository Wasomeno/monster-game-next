import { useQuery } from "@tanstack/react-query";
import { monsterContract } from "../hooks/useContract";

const useInactiveMonsters = (user) => {
  const monstersHandler = monsterContract();
  const { data, isLoading, isError } = useQuery(
    ["inactiveMonsters"],
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
    }
  );

  return { data: data, isLoading: isLoading, isError: isError };
};

export default useInactiveMonsters;
