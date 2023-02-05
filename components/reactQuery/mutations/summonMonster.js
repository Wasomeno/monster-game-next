import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { monsterContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import { mutationSideEfffects } from "./mutationSideEffects";

function summonMonster({ quantity }) {
  const { address: user } = useAccount();
  const monsterHandler = monsterContract();
  const provider = useMetamask();
  const { mutate } = useMutation(async () => {
    const price = await monsterHandler.SUMMON_PRICE();
    const transaction = await monsterHandler.summon(quantity, {
      value: (quantity * price).toString(),
    });
    return await provider.waitForTransaction(transaction.hash);
  }, mutationSideEfffects("Summoning Monster", ["allMonsters", user]));
  return mutate;
}

export default summonMonster;
