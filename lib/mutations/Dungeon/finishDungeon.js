import React from "react";
import { useAccount, useMutation } from "wagmi";
import { invalidateQuery } from "../../../contexts/reactQueryClient";
import { dungeonContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import { useLoading, useToast } from "../../../stores/stores";

const finishDungeon = () => {
  const { address: user } = useAccount();
  const dungeonHandler = dungeonContract();
  const provider = useMetamask();
  const { mutate } = useMutation(async () => {
    const transaction = await dungeonHandler.finishDungeon();
    return await provider.waitForTransaction(transaction.hash);
  }, finishDungeonSides(user));

  return mutate;
};

const finishDungeonSides = (user) => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => toggleLoading("Finishing Dungeon"),
    onSettled: () => toggleLoading(),
    onSuccess: () => {
      toastSuccess("Dungeon Finished");
      invalidateQuery(["monstersOnDungeon", user]);
      invalidateQuery(["dungeonTime", user]);
      invalidateQuery(["inactiveMonsters", user]);
    },
    onError: (error) => toastError(error.reason),
  };
};

export default finishDungeon;
