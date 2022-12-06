import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { dungeonContract } from "../../../hooks/useContract";

const useDungeonTime = () => {
  const { address: user } = useAccount();
  const dungeonHandler = dungeonContract();
  const { data, isLoading, isError } = useQuery(
    ["dungeonTime", user],
    async () => {
      const details = await dungeonHandler.monstersOnDungeon(user);
      const timeStart = details.startTime;
      const timeRequired = parseInt(timeStart) + 30 * 60;
      const timeNow = Math.floor(Date.now() / 1000);
      const elapsedTime = (timeNow - timeRequired) / 60;
      return Math.floor(elapsedTime);
    }
  );

  return { data: data, isLoaading: isLoading, isError: isError };
};

export default useDungeonTime;
