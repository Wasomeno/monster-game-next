import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { itemsContract } from "../../../hooks/useContract";
import { config } from "../queryConfig";

const useCrystalsInventory = () => {
  const { address: user } = useAccount();
  const itemsHandler = itemsContract();
  const { data, isLoading, isError } = useQuery(
    ["crystalsInventory", user],
    async () => await itemsHandler.balanceOf(user, 4),
    config
  );
  return { data: data, isLoading: isLoading, isError: isError };
};

export default useCrystalsInventory;
