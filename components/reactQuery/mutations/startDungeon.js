import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { dungeonContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import { mutationSideEfffects } from "./mutationSideEffects";

const queryKeys = (user) => [
  ["monstersOnDungeon", user],
  ["dungeonTime", user],
  ["inactiveMonsters", user],
];

function startDungeon(selectedMonsters) {
  const { address: user } = useAccount();
  const dungeonHandler = dungeonContract();
  const provider = useMetamask();
  const invalidateQueryKeys = queryKeys(user);
  const { mutate } = useMutation(async () => {
    const transaction = await dungeonHandler.startDungeon(selectedMonsters);
    return await provider.waitForTransaction(transaction.hash);
  }, mutationSideEfffects("Starting Dungeon", invalidateQueryKeys));

  return mutate;
}

export default startDungeon;
