import { useMutation } from "@tanstack/react-query";
import useMetamask from "../../../hooks/useMetamask";
import { monsterGameContract } from "../../../hooks/useContract";

const feedMonster = ({ amount, level, monster }) => {
  const monsterGameHandler = monsterGameContract();
  const provider = useMetamask();
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
    return await provider.waitForTransaction(transaction.hash);
  });
  return mutate;
};

export default feedMonster;
