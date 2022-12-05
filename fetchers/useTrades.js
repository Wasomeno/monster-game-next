import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { traderContract } from "../hooks/useContract";

const useTrades = () => {
  const traderHandler = traderContract();
  const { data, isLoading, isError } = useQuery(["trades"], async () => {
    return await traderHandler.getDailyTrades();
  });

  return { data: data, isLoading: isLoading, isError: isError };
};

export const useUserDailyTradeLimit = () => {
  const { address: user } = useAccount();
  const traderHandler = traderContract();
  const { data, isLoading, isError } = useQuery(
    ["dailyTradeLimit", user],
    async () => {
      return await traderHandler.getTradeDailyLimit(user);
    }
  );

  return { data: data, isLoading: isLoading, isError: isError };
};

export default useTrades;
