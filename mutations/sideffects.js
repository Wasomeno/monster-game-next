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
      toastSuccess("Mission success");
      //   itemsHandler.on("BeginnerMissionReward", (_monster, _items, _amount) => {
      //     setRewards([...{ monster: _monster, items: _items, amount: _amount }]);
      //   });
      queryClient.invalidateQueries(["monstersOnMission", user]);
      //   toggleRewards();
    },
    onError: (error) => toastError(error.reason),
  };
};

export const startRestingSides = (user) => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => toggleLoading("Resting your monsters"),
    onSettled: () => toggleLoading(),
    onSuccess: () => {
      toastSuccess("Your monsters is resting");
      queryClient.invalidateQueries(["monstersOnNursery", user]);
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

export const monstersToDungeonsSides = (user) => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => toggleLoading("Starting dungeon"),
    onSettled: () => toggleLoading(),
    onSuccess: () => {
      toastSuccess("Your monsters are on dungeon");
      queryClient.invalidateQueries(["monstersOnDungeon", user]);
      queryClient.invalidateQueries(["dungeonTime", user]);
    },
    onError: (error) => toastError(error.reason),
  };
};

export const finishDungeonSides = (user) => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => toggleLoading("Finishing Dungeon"),
    onSettled: () => toggleLoading(),
    onSuccess: () => {
      toastSuccess("Dungeon Success");
      queryClient.invalidateQueries(["monstersOnDungeon", user]);
      queryClient.invalidateQueries(["dungeonTime", user]);
    },
    onError: (error) => toastError(error.reason),
  };
};

export const summoningSides = (user) => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => toggleLoading("Summoning Monsters"),
    onSettled: () => toggleLoading(),
    onSuccess: () => {
      toastSuccess("Summon Success");
      queryClient.invalidateQueries(["allMonsters", user]);
    },
    onError: (error) => toastError(error.reason),
  };
};

export const buySides = () => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => toggleLoading("Preparing your items"),
    onSettled: () => toggleLoading(),
    onSuccess: () => {
      toastSuccess("Buy succesful");
    },
    onError: (error) => toastError(error.reason),
  };
};

export const tradeSides = () => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => toggleLoading("Preparing trades"),
    onSettled: () => toggleLoading(),
    onSuccess: () => {
      toastSuccess("Trade succesful");
    },
    onError: (error) => toastError(error.reason),
  };
};

export const registerSides = (user) => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => toggleLoading("Registering user"),
    onSettled: () => toggleLoading(),
    onSuccess: () => {
      toastSuccess("Register Success! Welcome to Monster Game");
      queryClient.invalidateQueries(["registerStatus", user]);
      queryClient.invalidateQueries(["userDetails", user]);
    },
    onError: (error) => toastError(error.reason),
  };
};
