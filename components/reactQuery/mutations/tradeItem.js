import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { itemsContract, traderContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import { useLoading, useToast } from "../../../stores/stores";
import useApprovalStatus from "../queries/useApprovalStatus";

function tradeItem({ id, quantity }) {
  const approvalStatus = useApprovalStatus({
    contractAddress: process.env.TRADER_CONTRACT_ADDRESS,
  });
  const { mutate } = useMutation(async () => {
    approvalStatus
      ? tradeItemApproved({ id: id, quantity: quantity })
      : tradeItemNotApproved({ id: id, quantity: quantity });
  }, tradeSides());

  return mutate;
}

async function tradeItemApproved({ id, quantity }) {
  const { address: user } = useAccount();
  const traderHandler = traderContract();
  const provider = useMetamask();
  const transaction = await traderHandler.tradeItem(id, quantity, user);
  return await provider.waitForTransaction(transaction.hash);
}

async function tradeItemNotApproved({ id, quantity }) {
  const { address: user } = useAccount();
  const itemsHandler = itemsContract();
  const traderHandler = traderContract();
  const provider = useMetamask();
  return await itemsHandler
    .setApprovalForAll(traderHandler.address, true)
    .then((response) => {
      provider.waitForTransaction(response.hash).then(() => {
        traderHandler.tradeItem(id, quantity, user);
      });
    });
}

export const tradeSides = () => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => toggleLoading("Preparing trades"),
    onSettled: () => toggleLoading(),
    onSuccess: () => {
      toastSuccess("Trade succesful");
    },
    onError: (error) => toastError(error.reason),
  };
};

export default tradeItem;
