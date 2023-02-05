import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { invalidateQuery } from "../../../contexts/reactQueryClient";
import { monsterContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import { useLoading, useToast } from "../../../stores/stores";

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
  }, summoningSides(user));
  return mutate;
}

function summoningSides(user) {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => toggleLoading("Summoning Monsters"),
    onSettled: () => toggleLoading(),
    onSuccess: () => {
      toastSuccess("Summon Success");
      invalidateQuery(["allMonsters", user]);
    },
    onError: (error) => toastError(error.reason),
  };
}

export default summonMonster;
