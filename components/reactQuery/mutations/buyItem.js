import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { traderContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import { mutationSideEfffects } from "./mutationSideEffects";

function buyItem({ itemSelected, quantity, total }) {
  const { address: user } = useAccount();
  const traderHandler = traderContract();
  const provider = useMetamask();
  const { mutate } = useMutation(async () => {
    const transaction = await traderHandler.buyItems(
      [itemSelected],
      [quantity],
      user,
      {
        value: total,
      }
    );
    return await provider.waitForTransaction(transaction.hash);
  }, mutationSideEfffects("Buying Items", ["dailyShopLimit", user]));
  return mutate;
}

export default buyItem;
