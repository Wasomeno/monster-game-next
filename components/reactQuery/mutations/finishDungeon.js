import { useAccount, useMutation } from "wagmi";

import { dungeonContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import { mutationSideEfffects } from "./mutationSideEffects";

const queryKeys = (user) => [
  ["monstersOnDungeon", user],
  ["dungeonTime", user],
  ["inactiveMonsters", user],
];

function finishDungeon() {
  const { address: user } = useAccount();
  const dungeonHandler = dungeonContract();
  const provider = useMetamask();
  const invalidateQueryKeys = queryKeys(user);
  const { mutate } = useMutation(async () => {
    const transaction = await dungeonHandler.finishDungeon();
    return await provider.waitForTransaction(transaction.hash);
  }, mutationSideEfffects("Finishing Dungeon", invalidateQueryKeys));

  return mutate;
}

export default finishDungeon;
