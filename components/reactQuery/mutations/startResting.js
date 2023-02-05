import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { invalidateQuery } from "../../../contexts/reactQueryClient";
import { nurseryContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import { useLoading, useToast } from "../../../stores/stores";

function startResting({ duration, monsters }) {
  const { address: user } = useAccount();
  const provider = useMetamask();
  const nurseryHandler = nurseryContract();
  const { mutate } = useMutation(async () => {
    const fee = await nurseryHandler.RESTING_FEE();
    const totalFee = fee * duration * monsters.length;
    const rest = await nurseryHandler.restMonsters(monsters, duration, {
      value: totalFee.toString(),
    });
    return await provider.waitForTransaction(rest.hash);
  }, startRestingSides(user));
  return mutate;
}

const startRestingSides = (user) => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => toggleLoading("Resting your monsters"),
    onSettled: () => toggleLoading(),
    onSuccess: () => {
      toastSuccess("Resting Started");
      invalidateQuery(["monstersOnNursery", user]);
      invalidateQuery(["nurseryTime", user]);
      invalidateQuery(["inactiveMonsters", user]);
    },
    onError: (error) => toastError(error.reason),
  };
};

export default startResting;
