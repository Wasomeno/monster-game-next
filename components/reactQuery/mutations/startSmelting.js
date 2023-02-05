import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { itemsContract, smelterContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import useApprovalStatus from "../queries/useApprovalStatus";
import { mutationSideEfffects } from "./mutationSideEffects";

const queryKeys = (user) => [
  ["monstersOnNursery", user],
  ["nurseryTime", user],
  ["inactiveMonsters", user],
];

function startSmelting(amount) {
  const { address: user } = useAccount();
  const smelterHandler = smelterContract();
  const itemsHandler = itemsContract();
  const provider = useMetamask();
  const approvalStatus = useApprovalStatus({
    contractAddress: process.env.SMELTER_CONTRACT_ADDRESS,
  });
  const invalidateQueryKeys = queryKeys(user);
  const { mutate } = useMutation(async () => {
    if (approvalStatus.data) {
      const transaction = await smelterHandler.smelt(amount);
      return await provider.waitForTransaction(transaction.hash);
    } else {
      const approval = await itemsHandler.setApprovalAll(
        smelterHandler.address,
        user
      );
      return await provider.waitForTransaction(approval.hash).then(() => {
        const smelt = smelterHandler.smelt(amount);
        return provider.waitForTransaction(smelt.hash);
      });
    }
  }, mutationSideEfffects("Starting Smelt", invalidateQueryKeys));
  return mutate;
}

export default startSmelting;
