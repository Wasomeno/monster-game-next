import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { monsterGameContract } from "../../../hooks/useContract";

function useMonstersOnMission() {
  const { address: user } = useAccount();
  const monsterGameHandler = monsterGameContract();
  const monsters = useQuery(
    ["monstersOnMission", user],
    async () => await monsterGameHandler.getMonstersOnMission(user),
    { staleTime: Infinity, cacheTime: Infinity }
  );
  return monsters;
}

export default useMonstersOnMission;
