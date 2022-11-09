import {
  traderContract,
  dungeonContract,
  monsterGameContract,
  nurseryContract,
  smelterContract,
  itemsContract,
} from "../hooks/useContract";

const itemsHandler = itemsContract();
const traderHandler = traderContract();
const dungeonHandler = dungeonContract();
const monsterGameHandler = monsterGameContract();
const nurseryHandler = nurseryContract();
const smelterHandler = smelterContract();

export async function getShop() {
  const shop = await traderHandler.getDailyShop();
  return shop;
}

export async function getTrades() {
  const trader = await traderHandler.getDailyTrades();
  return trader;
}

export async function getMonstersOnDungeon(user) {
  return await dungeonHandler.getMonstersOnDungeon(user);
}

export const missionTime = async (user) => {
  const details = await monsterGameHandler.monstersOnMissions(user);
  const timeStart = details.startTime;
  const timeRequired = parseInt(timeStart) + 15 * 60;
  const timeNow = Math.floor(Date.now() / 1000);
  const elapsedTime = (timeNow - timeRequired) / 60;

  return Math.floor(elapsedTime);
};

export const getDungeonTime = async (user) => {
  const details = await dungeonHandler.monstersOnDungeon(user);
  const timeStart = details.startTime;
  const timeRequired = parseInt(timeStart) + 30 * 60;
  const timeNow = Math.floor(Date.now() / 1000);
  const elapsedTime = (timeNow - timeRequired) / 60;

  return Math.floor(elapsedTime);
};

export const nurseryTime = async (user) => {
  const details = await nurseryHandler.monstersOnNursery(user);
  const timeStart = parseInt(details.startTime);
  const duration = parseInt(details.duration);
  const timeRequired = timeStart + duration;
  const timeNow = Math.floor(Date.now() / 1000);
  const elapsedTime = (timeNow - timeRequired) / 60;

  return Math.floor(elapsedTime);
};

export const smeltingTime = async (user) => {
  const details = await smelterHandler.smeltDetails(user);
  const timeStart = parseInt(details.startTime);
  const duration = parseInt(details.quantity) * 15 * 60;
  const timeRequired = timeStart + duration;
  const timeNow = Math.floor(Date.now() / 1000);
  const elapsedTime = (timeNow - timeRequired) / 60;

  return Math.floor(elapsedTime);
};

export async function getPotion() {
  return await itemsHandler.balanceOf(connection.account[0], 2);
}

export async function getInventory(user) {
  return await itemsHandler.getInventory(user);
}
