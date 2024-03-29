import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { dungeonContract } from "../../../hooks/useContract";
import { configWithRefetch } from "./queryConfig";

function useDungeonTime() {
  const { address: user } = useAccount();
  const dungeonHandler = dungeonContract();
  const time = useQuery(
    ["dungeonTime", user],
    async () => {
      const details = await dungeonHandler.monstersOnDungeon(user);
      const timeStart = details.startTime;
      const timeRequired = parseInt(timeStart) + 30 * 60;
      const timeNow = Math.floor(Date.now() / 1000);
      const elapsedTime = (timeNow - timeRequired) / 60;
      return Math.floor(elapsedTime);
    },
    { ...configWithRefetch, initialData: 0 }
  );

  return time;
}

export default useDungeonTime;
