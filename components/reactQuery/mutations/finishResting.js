import { useAccount, useMutation } from "wagmi";

import { nurseryContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import { mutationSideEfffects } from "./mutationSideEffects";

const queryKeys = (user) => [
  ["monstersOnNursery", user],
  ["nurseryTime", user],
  ["inactiveMonsters", user],
];

function finishResting() {
  const { address: user } = useAccount();
  const nurseryHandler = nurseryContract();
  const provider = useMetamask();
  const invalidateQueryKeys = queryKeys(user);
  const { mutate } = useMutation(async () => {
    const transaction = await nurseryHandler.finishResting();
    return await provider.waitForTransaction(transaction.hash);
  }, mutationSideEfffects("Finishing rest", invalidateQueryKeys));
  return mutate;
}

export default finishResting;
