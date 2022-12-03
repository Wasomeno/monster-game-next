import { useQuery } from "@tanstack/react-query";
import { traderContract } from "../hooks/useContract";

const useTrades = () => {
  const traderHandler = traderContract();
  const { data, isLoading, isError } = useQuery(["trades"], async () => {
    return await traderHandler.getDailyTrades();
  });

  return { data: data, isLoading: isLoading, isError: isError };
};

export default useTrades;
