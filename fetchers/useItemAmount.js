import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { itemsContract } from "../hooks/useContract";

const useItemAmount = ({ item }) => {
  const { address: user } = useAccount();
  const itemsHandler = itemsContract();
  const { data, isLoading, isError } = useQuery(
    ["itemAmount", item],
    async () => {
      return await itemsHandler.balanceOf(user, item);
    }
  );

  return { data: data, isLoading: isLoading, isError: isError };
};

export default useItemAmount;