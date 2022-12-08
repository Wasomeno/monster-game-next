import React from "react";
import { useAccount, useMutation } from "wagmi";
import { invalidateQuery } from "../../../contexts/reactQueryClient";
import { monsterGameContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import { useLoading, useToast } from "../../../stores/stores";

const finishMission = () => {
  const { address: user } = useAccount();
  const monsterGameHandler = monsterGameContract();
  const provider = useMetamask();
  const { mutate } = useMutation(async () => {
    const transaction = await monsterGameHandler.finishMission();
    return await provider.waitForTransaction(transaction.hash);
  }, finishMissionSides(user));
  return mutate;
};

const finishMissionSides = (user) => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => toggleLoading("Finishing mission"),
    onSettled: () => {
      toggleLoading();
    },
    onSuccess: () => {
      toastSuccess("Mission Finished");
      invalidateQuery(["monstersOnMission", user]);
      invalidateQuery(["missionTime", user]);
      invalidateQuery(["inactiveMonsters", user]);
    },
    onError: (error) => toastError(error.reason),
  };
};

export default finishMission;
