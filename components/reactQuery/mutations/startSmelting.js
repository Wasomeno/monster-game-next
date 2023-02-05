import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { invalidateQuery } from "../../../contexts/reactQueryClient";
import { itemsContract, smelterContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import { useLoading, useToast } from "../../../stores/stores";
import useApprovalStatus from "../queries/useApprovalStatus";

function startSmelting(amount) {
  const { address: user } = useAccount();
  const approvalStatus = useApprovalStatus({
    contractAddress: process.env.SMELTER_CONTRACT_ADDRESS,
  });
  const { mutate } = useMutation(
    () => (approvalStatus.data ? smelt(amount) : smeltNotApproved(amount)),
    smeltingSides(user)
  );
  return mutate;
}

export const smelt = async (crystalsAmount) => {
  const smelterHandler = smelterContract();
  const provider = useMetamask();
  const transaction = await smelterHandler.smelt(crystalsAmount);
  return await provider.waitForTransaction(transaction.hash);
};

export const smeltNotApproved = async (crystalsAmount) => {
  const smelterHandler = smelterContract();
  const itemsHandler = itemsContract();
  const provider = useMetamask();
  const approval = await itemsHandler.setApprovalAll(
    smelterHandler.address,
    user
  );
  return await provider.waitForTransaction(approval.hash).then(() => {
    const smelt = smelterHandler.smelt(crystalsAmount);
    return provider.waitForTransaction(smelt.hash);
  });
};

const smeltingSides = (user) => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => toggleLoading("Preparing crystals"),
    onSettled: () => toggleLoading(),
    onSuccess: () => {
      toastSuccess("Smelting Started");
      invalidateQuery(["crystalsInInventory", user]);
      invalidateQuery(["crystalsInSmelter", user]);
    },
    onError: (error) => toastError(error.reason),
  };
};

export default startSmelting;
