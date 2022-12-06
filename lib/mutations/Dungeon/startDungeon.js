import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { invalidateQuery } from "../../../contexts/reactQueryClient";
import { dungeonContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import { useLoading, useToast } from "../../../stores/stores";

const startDungeon = (selectedMonsters) => {
  const { address: user } = useAccount();
  const dungeonHandler = dungeonContract();
  const provider = useMetamask();
  const { mutate } = useMutation(async () => {
    const transaction = await dungeonHandler.startDungeon(selectedMonsters);
    return await provider.waitForTransaction(transaction.hash);
  }, startDungeonSides(user));

  return mutate;
};

const startDungeonSides = (user) => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => toggleLoading("Starting dungeon"),
    onSettled: () => toggleLoading(),
    onSuccess: () => {
      toastSuccess("Your monsters are on dungeon");
      invalidateQuery(["monstersOnDungeon", user]);
      invalidateQuery(["dungeonTime", user]);
    },
    onError: (error) => toastError(error.reason),
  };
};

export default startDungeon;
