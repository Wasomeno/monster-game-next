import { useAccount, useQuery } from "wagmi";

import { monsterGameContract } from "../../../hooks/useContract";

function useMissionTime() {
  const { address: user } = useAccount();
  const monsterGameHandler = monsterGameContract();
  const time = useQuery(
    ["missionTime", user],
    async () => {
      const details = await monsterGameHandler.monstersOnMissions(user);
      const timeStart = details.startTime;
      const timeRequired = parseInt(timeStart) + 15 * 60;
      const timeNow = Math.floor(Date.now() / 1000);
      const elapsedTime = timeNow - timeRequired;
      return Math.floor(elapsedTime);
    },
    {
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 1000,
      initialData: 0,
    }
  );
  return time;
}

export default useMissionTime;
