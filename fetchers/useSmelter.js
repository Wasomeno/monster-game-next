import { useAccount, useQuery } from "wagmi";
import { itemsContract, smelterContract } from "../hooks/useContract";

export const useCrystals = ({ key }) => {
  const { address: user } = useAccount();
  const functions = new Map();
  functions.set("inventory", {
    key: "crystalsInInventory",
    function: getCrystals(user),
  });
  functions.set("smelter", {
    key: "crystalsInInventory",
    function: getCrystals(user),
  });

  const crystal = functions.get(key);
  const { data, isLoading, isError } = useQuery([crystal.key], () =>
    crystal.function()
  );

  return { data: data, isLoading: isLoading, isError: isError };
};

export const getCrystals = (user) => {
  const itemsHandler = itemsContract();
  return async () => await itemsHandler.balanceOf(user, 4);
};

export const getCrystalsInSmelter = (user) => {
  const smelterHandler = smelterContract();
  return async () => await smelterHandler.smeltDetails(user);
};
