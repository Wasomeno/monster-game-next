import {
  traderContract,
  dungeonContract,
  monsterGameContract,
  nurseryContract,
  smelterContract,
  itemsContract,
  monsterContract,
  usersDataContract,
} from "../hooks/useContract";

export function getShop() {
  const traderHandler = traderContract();
  return async () => await traderHandler.getDailyShop();
}

export function getTrades() {
  const traderHandler = traderContract();
  return async () => await traderHandler.getDailyTrades();
}

export function getMonstersOnDungeon(user) {
  const dungeonHandler = dungeonContract();
  return async () => await dungeonHandler.getMonstersOnDungeon(user);
}

export const getMissionTime = async (user) => {
  const monsterGameHandler = monsterGameContract();
  const details = await monsterGameHandler.monstersOnMissions(user);
  const timeStart = details.startTime;
  const timeRequired = parseInt(timeStart) + 15 * 60;
  const timeNow = Math.floor(Date.now() / 1000);
  const elapsedTime = (timeNow - timeRequired) / 60;
  return Math.floor(elapsedTime);
};

export const getDungeonTime = async (user) => {
  const dungeonHandler = dungeonContract();
  const details = await dungeonHandler.monstersOnDungeon(user);
  const timeStart = details.startTime;
  const timeRequired = parseInt(timeStart) + 30 * 60;
  const timeNow = Math.floor(Date.now() / 1000);
  const elapsedTime = (timeNow - timeRequired) / 60;

  return Math.floor(elapsedTime);
};

export const getNurseryTime = async (user) => {
  const nurseryHandler = nurseryContract();
  const details = await nurseryHandler.monstersOnNursery(user);
  const timeStart = parseInt(details.startTime);
  const duration = parseInt(details.duration);
  const timeRequired = timeStart + duration;
  const timeNow = Math.floor(Date.now() / 1000);
  const elapsedTime = (timeNow - timeRequired) / 60;

  return Math.floor(elapsedTime);
};

export const getSmeltingTime = async (user) => {
  const smelterHandler = smelterContract();
  const details = await smelterHandler.smeltDetails(user);
  const timeStart = parseInt(details.startTime);
  const duration = parseInt(details.quantity) * 15 * 60;
  const timeRequired = timeStart + duration;
  const timeNow = Math.floor(Date.now() / 1000);
  const elapsedTime = (timeNow - timeRequired) / 60;

  return Math.floor(elapsedTime);
};

export function getPotion() {
  const itemsHandler = itemsContract();
  return async () => await itemsHandler.balanceOf(connection.account[0], 2);
}

export function getInventory(user) {
  const itemsHandler = itemsContract();
  return async () => await itemsHandler.getInventory(user);
}

export function getMonstersOnMissions(user) {
  const monsterGameHandler = monsterGameContract();
  return async () => await monsterGameHandler.getMonstersOnMission(user);
}

export async function getInactiveMonsters(user) {
  const monstersHandler = monsterContract();
  const monstersFetched = await monstersHandler.getMonsters(user);
  const inactiveMonsters = await Promise.all(
    monstersFetched.map(async (monster) => {
      const stats = await monstersHandler.monsterStats(monster);
      if (stats.status === 0) return { id: parseInt(monster), ...stats };
    })
  );
  return inactiveMonsters.filter((details) => {
    return details !== undefined;
  });
}

export async function getAllMonsters(user) {
  const monstersHandler = monsterContract();
  const monstersFetched = await monstersHandler.getMonsters(user);
  const details = await Promise.all(
    monstersFetched.map(async (monster) => {
      const { status } = await monstersHandler.monsterStats(monster);
      return { id: monster, status: status };
    })
  );
  return details;
}

export function getMonstersOnNursery(user) {
  const nurseryHandler = nurseryContract();
  return async () => await nurseryHandler.getRestingMonsters(user);
}

export function getCrystals(user) {
  const itemsHandler = itemsContract();
  return async () => await itemsHandler.balanceOf(user, 4);
}

export function getCrystalsInSmelter(user) {
  const smelterHandler = smelterContract();
  return async () => await smelterHandler.smeltDetails(user);
}

export function getApprovalStatus(user, contractAddress) {
  const itemsHandler = itemsContract();
  return async () => await itemsHandler.isApprovedForAll(user, contractAddress);
}

export function getGold(user) {
  const itemsHandler = itemsContract();
  return async () => await itemsHandler.balanceOf(user, 0);
}

export function getUserDetails(user) {
  const userDataHandler = usersDataContract();
  return async () => await userDataHandler.userDataDetails(user);
}

export function getUserStatus(user) {
  const userDataHandler = usersDataContract();
  return async () => await userDataHandler.registrationStatus(user);
}
export function getItemDetails(item) {
  const traderHandler = traderContract();
  return async () => await traderHandler.shopItems(item);
}

export function getDailyShopLimit(user) {
  const traderHandler = traderContract();
  return async () => await traderHandler.getShopDailyLimit(user);
}
