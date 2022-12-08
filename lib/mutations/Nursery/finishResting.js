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
      toggleLoading("Finishing rest");
    },
    onSettled: () => {
      toggleLoading();
    },
    onSuccess: () => {
      toastSuccess("Resting Finished");
      invalidateQuery(["monstersOnNursery", user]);
      invalidateQuery(["nurseryTime", user]);
      invalidateQuery(["inactiveMonsters", user]);
    },
    onError: (error) => {
      console.log(error);
      toastError(error.reason);
    },
  };
};

export default finishResting;
