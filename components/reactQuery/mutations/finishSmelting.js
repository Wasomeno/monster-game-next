import { useAccount, useMutation } from "wagmi";

import { invalidateQuery } from "../../../contexts/reactQueryClient";
import { smelterContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import { useLoading, useToast } from "../../../stores/stores";

function finishSmelting() {
  const { address: user } = useAccount();
  const smelterHandler = smelterContract();
  const provider = useMetamask();
  const { mutate } = useMutation(async () => {
    const transaction = await smelterHandler.finishSmelting();
    return await provider.waitForTransaction(transaction.hash);
  }, finishSmeltingSides(user));
  return mutate;
}

const finishSmeltingSides = (user) => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => toggleLoading("Preparing smelted crystals"),
    onSettled: () => toggleLoading(),
    onSuccess: () => {
      toastSuccess("Smelting Finished");
      invalidateQuery(["crystalsInInventory", user]);
      invalidateQuery(["crystalsInSmelter", user]);
    },
    onError: (error) => toastError(error.reason),
  };
};

export default finishSmelting;
