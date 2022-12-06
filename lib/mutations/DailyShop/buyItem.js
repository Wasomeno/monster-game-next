import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { traderContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import { invalidateQuery } from "../../../contexts/reactQueryClient";
import { useLoading, useToast } from "../../../stores/stores";

const buyItem = ({ itemSelected, quantity, total }) => {
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
  }, buySides(user));
  return mutate;
};

const buySides = (user) => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => toggleLoading("Preparing your items"),
    onSettled: () => toggleLoading(),
    onSuccess: () => {
      toastSuccess("Buy succesful");
      invalidateQuery(["dailyShopLimit", user]);
    },
    onError: (error) => toastError(error.reason),
  };
};
export default buyItem;
