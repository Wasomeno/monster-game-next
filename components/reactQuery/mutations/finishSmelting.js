import { useAccount, useMutation } from "wagmi";

import { smelterContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import { mutationSideEfffects } from "./mutationSideEffects";

const queryKeys = (user) => [
  ["crystalsInInventory", user],
  ["crystalsInSmelter", user],
];

function finishSmelting() {
  const { address: user } = useAccount();
  const smelterHandler = smelterContract();
  const provider = useMetamask();
  const invalidateQueryKeys = queryKeys(user);
  const { mutate } = useMutation(async () => {
    const transaction = await smelterHandler.finishSmelting();
    return await provider.waitForTransaction(transaction.hash);
  }, mutationSideEfffects("Finishing Smelt", invalidateQueryKeys));
  return mutate;
}

export default finishSmelting;
