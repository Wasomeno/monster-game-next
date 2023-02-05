import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { itemsContract, traderContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import useApprovalStatus from "../queries/useApprovalStatus";
import { mutationSideEfffects } from "./mutationSideEffects";

function tradeItem({ id, quantity }) {
  const { address: user } = useAccount();
  const itemsHandler = itemsContract();
  const traderHandler = traderContract();
  const provider = useMetamask();
  const approvalStatus = useApprovalStatus({
    contractAddress: process.env.TRADER_CONTRACT_ADDRESS,
  });
  const { mutate } = useMutation(async () => {
    if (approvalStatus.data) {
      const transaction = await traderHandler.tradeItem(id, quantity, user);
      return await provider.waitForTransaction(transaction.hash);
    } else {
      return await itemsHandler
        .setApprovalForAll(traderHandler.address, true)
        .then((response) => {
          provider.waitForTransaction(response.hash).then(() => {
            traderHandler.tradeItem(id, quantity, user);
          });
        });
    }
  }, mutationSideEfffects("Trading Item"));

  return mutate;
}

export default tradeItem;
