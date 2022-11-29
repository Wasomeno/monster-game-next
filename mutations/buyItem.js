import { useMutation } from "@tanstack/react-query";
import { waitForTransaction } from "@wagmi/core";
import { useAccount } from "wagmi";
import { traderContract } from "../hooks/useContract";
import { buySides } from "./sideffects";

const buyItem = ({ itemSelected, quantity, total }) => {
  const { address: user } = useAccount();
  const traderHandler = traderContract();
  const { mutate } = useMutation(async () => {
    const transaction = await traderHandler.buyItems(
      [itemSelected],
      [quantity],
      user,
      {
        value: total,
      }
    );
    return await waitForTransaction({ hash: transaction.hash });
  }, buySides());
  return mutate;
};

export default buyItem;
