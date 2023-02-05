import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { nurseryContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import { mutationSideEfffects } from "./mutationSideEffects";

const queryKeys = (user) => [
  ["monstersOnNursery", user],
  ["nurseryTime", user],
  ["inactiveMonsters", user],
];

function startResting({ duration, monsters }) {
  const { address: user } = useAccount();
  const provider = useMetamask();
  const nurseryHandler = nurseryContract();
  const invalidateQueryKeys = queryKeys(user);
  const { mutate } = useMutation(async () => {
    const fee = await nurseryHandler.RESTING_FEE();
    const totalFee = fee * duration * monsters.length;
    const rest = await nurseryHandler.restMonsters(monsters, duration, {
      value: totalFee.toString(),
    });
    return await provider.waitForTransaction(rest.hash);
  }, mutationSideEfffects("Starting Rest", invalidateQueryKeys));
  return mutate;
}

export default startResting;
