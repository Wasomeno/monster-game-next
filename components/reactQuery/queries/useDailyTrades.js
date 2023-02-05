import { useQuery } from "@tanstack/react-query";

import { traderContract } from "../../../hooks/useContract";
import { config } from "./queryConfig";

function useDailyTrades() {
  const traderHandler = traderContract();
  const { data, isLoading, isError } = useQuery(
    ["trades"],
    async () => {
      return await traderHandler.getDailyTrades();
    },
    config
  );

  return { data: data, isLoading: isLoading, isError: isError };
}

export default useDailyTrades;
