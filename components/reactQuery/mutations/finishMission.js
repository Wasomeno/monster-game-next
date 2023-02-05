import { useAccount, useMutation } from "wagmi";

import { monsterGameContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import { mutationSideEfffects } from "./mutationSideEffects";

const queryKeys = (user) => [
  ["monstersOnMission", user],
  ["missionTime", user],
  ["inactiveMonsters", user],
];

function finishMission() {
  const { address: user } = useAccount();
  const invalidateQueryKeys = queryKeys(user);
  const monsterGameHandler = monsterGameContract();
  const provider = useMetamask();
  const { mutate } = useMutation(async () => {
    const transaction = await monsterGameHandler.finishMission();
    return await provider.waitForTransaction(transaction.hash);
  }, mutationSideEfffects("Finishing Mission", invalidateQueryKeys));
  return mutate;
}

export default finishMission;
