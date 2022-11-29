import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { itemsContract } from "../hooks/useContract";

const useInventory = () => {
  const { address: user } = useAccount();
  const itemsHandler = itemsContract();
  const { data, isLoading, isError } = useQuery(
    ["inventory", user],
    async () => await itemsHandler.getInventory(user)
  );
  return { data: data, isLoading: isLoading, isError: isError };
};

export default useInventory;
