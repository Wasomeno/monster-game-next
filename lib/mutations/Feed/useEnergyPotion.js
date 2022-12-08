import React from "react";
import { useMutation } from "wagmi";
import { monsterGameContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";

const useEnergyPotion = (monster) => {
  const monsterGameHandler = monsterGameContract();
  const provider = useMetamask();
  const { mutate } = useMutation(async () => {
    const transaction = await monsterGameHandler.useEnergyPotion(monster, 1);
    return await provider.waitForTransaction(transaction.hash);
  });
  return mutate;
};

export default useEnergyPotion;
