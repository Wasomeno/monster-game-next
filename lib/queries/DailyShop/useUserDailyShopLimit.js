import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { traderContract } from "../../../hooks/useContract";
import { config } from "../queryConfig";

const useUserDailyShopLimit = () => {
  const { address: user } = useAccount();
  const traderHandler = traderContract();
  const { data, isLoading, isError } = useQuery(
    ["dailyShopLimit", user],
    async () => {
      const limit = await traderHandler.getShopDailyLimit(user);
      return limit;
    },
    config
  );
  return { data: data, isLoading: isLoading, isError: isError };
};

export default useUserDailyShopLimit;
