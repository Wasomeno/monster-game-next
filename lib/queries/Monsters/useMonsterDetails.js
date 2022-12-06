import { useQuery } from "@tanstack/react-query";
import { monsterContract } from "../../../hooks/useContract";

const useMonsterDetails = ({ monster }) => {
  const monstersHandler = monsterContract();
  const { data, isLoading, isError } = useQuery(
    ["monsterDetails", monster],
    async () => {
      return await monstersHandler.monsterStats(monster);
    }
  );

  return { data: data, isLoading: isLoading, isError: isError };
};

export default useMonsterDetails;
