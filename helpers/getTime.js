import {
  dungeonContract,
  monsterGameContract,
  nurseryContract,
} from "../hooks/useContract";

export const missionTime = async (user) => {
  const monsterGameHandler = monsterGameContract();

  const details = await monsterGameHandler.monstersOnMissions(user);
  const timeStart = details.startTime;
  const timeRequired = parseInt(timeStart) + 10 * 60;
  const timeNow = Math.floor(Date.now() / 1000);
  const elapsedTime = (timeNow - timeRequired) / 60;

  return Math.floor(elapsedTime);
};

export const dungeonTime = async (user) => {
  const dungeonHandler = dungeonContract();

  const details = await dungeonHandler.monstersOnDungeon(user);
  const timeStart = details.startTime;
  const timeRequired = parseInt(timeStart) + 15 * 60;
  const timeNow = Math.floor(Date.now() / 1000);
  const elapsedTime = (timeNow - timeRequired) / 60;

  return Math.floor(elapsedTime);
};

export const nurseryTime = async (user) => {
  const nurseryHandler = nurseryContract();

  const details = await nurseryContract.monstersOnNursery(user);
  const timeStart = details.startTime;
  const duration = details.duration;
  const timeRequired = parseInt(timeStart + duration);
  const timeNow = Math.floor(Date.now() / 1000);
  const elapsedTime = (timeNow - timeRequired) / 60;

  return Math.floor(elapsedTime);
};
