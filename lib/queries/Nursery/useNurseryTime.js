import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { nurseryContract } from "../../../hooks/useContract";

const useNurseryTime = () => {
  const { address: user } = useAccount();
  const nurseryHandler = nurseryContract();
  const { data, isLoading, isError } = useQuery(
    ["nurseryTime", user],
    async () => {
      const details = await nurseryHandler.monstersOnNursery(user);
      const timeStart = parseInt(details.startTime);
      const duration = parseInt(details.duration);
      const timeRequired = timeStart + duration;
      const timeNow = Math.floor(Date.now() / 1000);
      const elapsedTime = (timeNow - timeRequired) / 60;
      return Math.floor(elapsedTime);
    },
    {
      refetchInterval: 60000,
      initialData: 1,
    }
  );

  return { data: data, isLoading: isLoading, isError: isError };
};

export default useNurseryTime;
