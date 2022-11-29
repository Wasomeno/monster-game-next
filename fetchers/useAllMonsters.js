import { monsterContract } from "../hooks/useContract";
import { useQuery } from "@tanstack/react-query";

const useAllMonsters = (user) => {
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
    }
  );

  return { data: data, isLoading: isLoading, isError: isError };
};

export default useAllMonsters;