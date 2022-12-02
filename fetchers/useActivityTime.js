import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import {
  dungeonContract,
  monsterGameContract,
  nurseryContract,
  smelterContract,
} from "../hooks/useContract";

const useActivityTime = (activity) => {
  const timeMap = new Map();
  const { address: user } = useAccount();
  timeMap.set("mission", {
    key: "missionTime",
    getTime: getMissionTime(user),
  });
  timeMap.set("nursery", {
    key: "nurseryTime",
    getTime: getNurseryTime(user),
  });
  timeMap.set("dungeon", {
    key: "dungeonTime",
    getTime: getDungeonTime(user),
  });
  timeMap.set("smelting", {
    key: "smeltingTime",
    getTime: getSmeltingTime(user),
  });

  const { key, getTime } = timeMap.get(activity);
  const { data, isLoading, isError } = useQuery([key, user], () => getTime);
  return { data: data, isLoading: isLoading, isError: isError };
};

const getMissionTime = async (user) => {
  const monsterGameHandler = monsterGameContract();
  const details = await monsterGameHandler.monstersOnMissions(user);
  const timeStart = details.startTime;
  const timeRequired = parseInt(timeStart) + 15 * 60;
  const timeNow = Math.floor(Date.now() / 1000);
  const elapsedTime = (timeNow - timeRequired) / 60;
  return Math.floor(elapsedTime);
};

const getDungeonTime = async (user) => {
  const dungeonHandler = dungeonContract();
  const details = await dungeonHandler.monstersOnDungeon(user);
  const timeStart = details.startTime;
  const timeRequired = parseInt(timeStart) + 30 * 60;
  const timeNow = Math.floor(Date.now() / 1000);
  const elapsedTime = (timeNow - timeRequired) / 60;
  return Math.floor(elapsedTime);
};

const getNurseryTime = async (user) => {
  const nurseryHandler = nurseryContract();
  const details = await nurseryHandler.monstersOnNursery(user);
  const timeStart = parseInt(details.startTime);
  const duration = parseInt(details.duration);
  const timeRequired = timeStart + duration;
  const timeNow = Math.floor(Date.now() / 1000);
  const elapsedTime = (timeNow - timeRequired) / 60;
  return Math.floor(elapsedTime);
};

const getSmeltingTime = async (user) => {
  const smelterHandler = smelterContract();
  const details = await smelterHandler.smeltDetails(user);
  const timeStart = parseInt(details.startTime);
  const duration = parseInt(details.quantity) * 15 * 60;
  const timeRequired = timeStart + duration;
  const timeNow = Math.floor(Date.now() / 1000);
  const elapsedTime = (timeNow - timeRequired) / 60;

  return Math.floor(elapsedTime);
};

export default useActivityTime;
