import { useAccount, useMutation } from "wagmi";

import { monsterGameContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import { mutationSideEfffects } from "./mutationSideEffects";

const queryKeys = (user) => [
  ["monstersOnMission", user],
  ["missionTime", user],
  ["inactiveMonsters", user],
];

const startMission = ({ mission, monstersSelected }) => {
  const { address: user } = useAccount();
  const monsterGameHandler = monsterGameContract();
  const provider = useMetamask();
  const invalidateQueryKeys = queryKeys(user);
  const { mutate } = useMutation(async () => {
    const transaction = await monsterGameHandler.startMission(
      mission,
      monstersSelected
    );
    return await provider.waitForTransaction(transaction.hash);
  }, mutationSideEfffects("starting", "mission", invalidateQueryKeys));
  return mutate;
};

export default startMission;
