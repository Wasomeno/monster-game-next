import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { traderContract } from "../hooks/useContract";

const useDailyShop = () => {
  const traderHandler = traderContract();
  const { data, isLoading, isError } = useQuery(["dailyShop"], async () => {
    const shopItems = await traderHandler.getDailyShop();
    const itemsDetails = await fetch("items/items.json").then(
      async (results) => await results.json()
    );
    const itemsWithDetails = shopItems.map((item, index) => {
      const itemDetails = itemsDetails[index];
      return {
        id: item.item,
        name: itemDetails.name,
        image: itemDetails.image,
        description: itemDetails.description,
        limit: item.limit,
        price: item.price,
      };
    });
    return itemsWithDetails;
  });
  return { data: data, isLoading: isLoading, isError: isError };
};

export const useUserDailyShopLimit = () => {
  const { address: user } = useAccount();
  const traderHandler = traderContract();
  const { data, isLoading, isError } = useQuery(
    ["dailyShopLimit", user],
    async () => {
      const limit = await traderHandler.getShopDailyLimit(user);
      return limit;
    }
  );
  return { data: data, isLoading: isLoading, isError: isError };
};

export default useDailyShop;
