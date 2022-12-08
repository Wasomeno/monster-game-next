import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { nurseryContract } from "../../../hooks/useContract";
import { configWithRefetch } from "../queryConfig";

const useNurseryTime = () => {
  const { address: user } = useAccount();
  const nurseryHandler = nurseryContract();
  const time = useQuery(
    ["nurseryTime", user],
    async () => {
      const details = await nurseryHandler.monstersOnNursery(user);
      const timeStart = parseInt(details.startTime);
      const duration = parseInt(details.duration);
      const timeRequired = timeStart + duration;
      const timeNow = Math.floor(Date.now() / 1000);
      const elapsedTime = timeNow - timeRequired;
      return Math.floor(elapsedTime);
    },
    { ...configWithRefetch, initialData: 0 }
  );

  return time;
};

export default useNurseryTime;
