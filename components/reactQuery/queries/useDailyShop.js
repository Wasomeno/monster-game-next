import { useQuery } from "@tanstack/react-query";

import { traderContract } from "../../../hooks/useContract";
import { config } from "./queryConfig";

function useDailyShop() {
  const traderHandler = traderContract();
  const { data, isLoading, isError } = useQuery(
    ["dailyShop"],
    async () => {
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
    },
    config
  );
  return { data: data, isLoading: isLoading, isError: isError };
}

export default useDailyShop;
