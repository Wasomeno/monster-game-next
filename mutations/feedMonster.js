import { useMutation } from "@tanstack/react-query";
import { waitForTransaction } from "@wagmi/core";
import { monsterGameContract } from "../hooks/useContract";

const feedMonster = ({ amount, level, monster }) => {
  const monsterGameHandler = monsterGameContract();
  const { mutate } = useMutation(async () => {
    const fee = await monsterGameHandler.FEEDING_FEE();
    const totalAmount = amount * 10;
    const totalFee = totalAmount * fee * level;
    const transaction = await monsterGameHandler.feedMonster(
      monster,
      totalAmount,
      {
        value: totalFee.toString(),
      }
    );
    return await waitForTransaction(transaction.hash);
  });
  return mutate;
};

export function useEnergyPotion({ monster }) {
  const monsterGameHandler = monsterGameContract();
  const { mutate } = useMutation(async () => {
    const transaction = await monsterGameHandler.useEnergyPotion(monster, 1);
    return await waitForTransaction(transaction.hash);
  });
  return mutate;
}

export default feedMonster;
