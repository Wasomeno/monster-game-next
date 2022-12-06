import { useAccount, useMutation } from "wagmi";
import { invalidateQuery } from "../../../contexts/reactQueryClient";
import { nurseryContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import { useLoading, useToast } from "../../../stores/stores";

const finishResting = () => {
  const { address: user } = useAccount();
  const nurseryHandler = nurseryContract();
  const provider = useMetamask();
  const { mutate } = useMutation(async () => {
    const transaction = await nurseryHandler.finishResting();
    return await provider.waitForTransaction(transaction.hash);
  }, finishRestingSides(user));
  return mutate;
};

const finishRestingSides = (user) => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => {
      toggleLoading("Bringing back monsters");
    },
    onSettled: () => {
      toggleLoading();
    },
    onSuccess: () => {
      toastSuccess("Your monsters are back");
      invalidateQuery(["monstersOnNursery", user]);
    },
    onError: (error) => {
      toastError(error.reason);
    },
  };
};

export default finishResting;
