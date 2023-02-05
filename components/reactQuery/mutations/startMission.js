import { useAccount, useMutation } from "wagmi";

import { invalidateQuery } from "../../../contexts/reactQueryClient";
import { monsterGameContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import { useLoading, useToast } from "../../../stores/stores";

const startMission = ({ mission, monstersSelected }) => {
  const { address: user } = useAccount();
  const monsterGameHandler = monsterGameContract();
  const provider = useMetamask();
  const { mutate } = useMutation(async () => {
    const transaction = await monsterGameHandler.startMission(
      mission,
      monstersSelected
    );
    return await provider.waitForTransaction(transaction.hash);
  }, startMissionSides(user));
  return mutate;
};

const startMissionSides = (user) => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => toggleLoading("Starting mission"),
    onSettled: () => toggleLoading(),
    onSuccess: () => {
      toastSuccess("Mission Started");
      invalidateQuery(["monstersOnMission", user]);
      invalidateQuery(["missionTime", user]);
      invalidateQuery(["inactiveMonsters", user]);
    },
    onError: (error) => toastError(error.reason),
  };
};

export default startMission;
