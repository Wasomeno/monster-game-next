import { queryClient } from "../contexts/reactQueryClient";
import { itemsContract } from "../hooks/useContract";
import { rewardsModalStores } from "../stores/modalStores";
import { useLoading, useToast } from "../stores/stores";

export const monstersToMissionSides = (user) => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => toggleLoading("Starting mission"),
    onSettled: () => toggleLoading(),
    onSuccess: () => {
      toastSuccess("Your monsters is on mission");
      queryClient.invalidateQueries(["monstersOnMission", user]);
      queryClient.invalidateQueries(["missionTime", user]);
    },
    onError: (error) => toastError(error.reason),
  };
};

export const finishMissionSides = (user) => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  const [toggleRewards, setRewards] = rewardsModalStores((state) => [
    state.toggleShow,
    state.setRewards,
  ]);
  //   const itemsHandler = itemsContract();

  return {
    onMutate: () => toggleLoading("Finishing mission"),
    onSettled: () => toggleLoading(),
    onSuccess: () => {
      toastSuccess("Mission finished");
      //   itemsHandler.on("BeginnerMissionReward", (_monster, _items, _amount) => {
      //     setRewards([...{ monster: _monster, items: _items, amount: _amount }]);
      //   });
      queryClient.invalidateQueries(["monstersOnMission", user]);
      //   toggleRewards();
    },
    onError: (error) => toastError(error.reason),
  };
};

export const finishRestingSides = (user) => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => {
      toggleLoading("Bringing back monsters");
      queryClient.invalidateQueries(["monstersOnNursery", user]);
    },
    onSettled: () => {
      toggleLoading();
    },
    onSuccess: () => {
      toastSuccess("Your monsters are back");
    },
    onError: (error) => {
      toastError(error);
    },
  };
};
