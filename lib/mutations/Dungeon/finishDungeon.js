import React from "react";
import { useMutation } from "wagmi";
import { invalidateQuery } from "../../../contexts/reactQueryClient";
import { dungeonContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import { useLoading, useToast } from "../../../stores/stores";

const finishDungeon = () => {
  const dungeonHandler = dungeonContract();
  const provider = useMetamask();
  const { mutate } = useMutation(async () => {
    const transaction = await dungeonHandler.finishDungeon();
    return await provider.waitForTransaction(transaction.hash);
  }, finishDungeonSides());

  return mutate;
};

const finishDungeonSides = (user) => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => toggleLoading("Finishing Dungeon"),
    onSettled: () => toggleLoading(),
    onSuccess: (result) => {
      console.log(result);
      toastSuccess("Dungeon Success");
      invalidateQuery(["monstersOnDungeon", user]);
      invalidateQuery(["dungeonTime", user]);
    },
    onError: (error) => toastError(error.reason),
  };
};

export default finishDungeon;
