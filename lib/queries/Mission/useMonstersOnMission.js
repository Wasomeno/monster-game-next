import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { monsterGameContract } from "../../../hooks/useContract";

const useMonstersOnMission = () => {
  const { address: user } = useAccount();
  const monsterGameHandler = monsterGameContract();
  const { data, isLoading, isError } = useQuery(
    ["monstersOnMission", user],
    async () => await monsterGameHandler.getMonstersOnMission(user)
  );
  return { data: data, isLoading: isLoading, isError: isError };
};

export default useMonstersOnMission;
