import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import {
  dungeonContract,
  monsterGameContract,
  nurseryContract,
} from "../hooks/useContract";

const useMonstersOnActivity = (activity) => {
  const { address: user } = useAccount();
  const monstersMap = new Map();
  monstersMap.set("mission", {
    key: "monstersOnMission",
    getMonsters: getMonstersOnMissions(user),
  });
  monstersMap.set("nursery", {
    key: "monstersOnNursery",
    getMonsters: getMonstersOnNursery(user),
  });
  monstersMap.set("dungeon", {
    key: "monstersOnDungeon",
    getMonsters: getMonstersOnDungeon(user),
  });

  const { key, getMonsters } = monstersMap.get(activity);
  const { data, isLoading, isError } = useQuery([key], () => getMonsters);
  return { data: data, isLoading: isLoading, isError };
};

function getMonstersOnMissions(user) {
  const monsterGameHandler = monsterGameContract();
  return async () => await monsterGameHandler.getMonstersOnMission(user);
}

function getMonstersOnNursery(user) {
  const nurseryHandler = nurseryContract();
  return async () => await nurseryHandler.getRestingMonsters(user);
}

function getMonstersOnDungeon(user) {
  const dungeonHandler = dungeonContract();
  return async () => await dungeonHandler.getMonstersOnDungeon(user);
}

export default useMonstersOnActivity;
