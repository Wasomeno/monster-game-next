import { useAccount, useQuery } from "wagmi";
import { smelterContract } from "../../../hooks/useContract";

const useSmeltingTime = () => {
  const { address: user } = useAccount();
  const smelterHandler = smelterContract();
  const { data, isLoading, isError } = useQuery(
    ["smeltingTime", user],
    async () => {
      await smelterHandler.smeltDetails(user);
      const timeStart = parseInt(details.startTime);
      const duration = parseInt(details.quantity) * 15 * 60;
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

export default useSmeltingTime;
