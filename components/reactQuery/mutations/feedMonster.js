import { useMutation } from "@tanstack/react-query";

import { monsterGameContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import { mutationSideEfffects } from "./mutationSideEffects";

function feedMonster({ amount, level, monster }) {
  const monsterGameHandler = monsterGameContract();
  const provider = useMetamask();
  const { mutate } = useMutation(async () => {
    const fee = await monsterGameHandler.FEEDING_FEE();
    const totalAmount = amount * 10;
    const totalFee = (totalAmount * fee * level).toString();
    const transaction = await monsterGameHandler.feedMonster(
      monster,
      totalAmount,
      {
        value: totalFee,
      }
    );
    return await provider.waitForTransaction(transaction.hash);
  }, mutationSideEfffects("Feeding monster"));
  return mutate;
}

export default feedMonster;
