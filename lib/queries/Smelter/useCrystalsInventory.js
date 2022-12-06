import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { itemsContract } from "../../../hooks/useContract";

const useCrystalsInventory = () => {
  const { address: user } = useAccount();
  const itemsHandler = itemsContract();
  const { data, isLoading, isError } = useQuery(
    [""],
    async () => await itemsHandler.balanceOf(user, 4)
  );
  return { data: data, isLoading: isLoading, isError: isError };
};

export default useCrystalsInventory;
