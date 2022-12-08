import React from "react";
import { useAccount, useQuery } from "wagmi";
import { traderContract } from "../../../hooks/useContract";
import { config } from "../queryConfig";

const useUserDailyTradeLimit = () => {
  const { address: user } = useAccount();
  const traderHandler = traderContract();
  const { data, isLoading, isError } = useQuery(
    ["dailyTradeLimit", user],
    async () => {
      return await traderHandler.getTradeDailyLimit(user);
    },
    config
  );

  return { data: data, isLoading: isLoading, isError: isError };
};

export default useUserDailyTradeLimit;
