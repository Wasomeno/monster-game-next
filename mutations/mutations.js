import { ethers } from "ethers";
import {
  dungeonContract,
  itemsContract,
  monsterContract,
  monsterGameContract,
  nurseryContract,
  smelterContract,
  traderContract,
  usersDataContract,
} from "../hooks/useContract";

export async function summonMonster(quantity) {
  const monsterHandler = monsterContract();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const price = await monsterHandler.SUMMON_PRICE();
  const formattedPrice = ethers.utils.formatEther(price);
  const totalCost = formattedPrice * quantity;
  const transaction = await monsterHandler.summon(quantity, {
    value: ethers.utils.parseEther(totalCost.toString()),
  });
  return await provider.waitForTransaction(transaction.hash);
}

export async function buy(itemsSelected, quantity, user, total) {
  const traderHandler = traderContract();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const transaction = await traderHandler.buyItems(
    itemsSelected,
    quantity,
    user,
    {
      value: total,
    }
  );

  return await provider.waitForTransaction(transaction.hash);
}

export async function tradeItemApproved(index, quantity, user) {
  const traderHandler = traderContract();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const transaction = await traderHandler.tradeItem(
    index,
    quantity[index],
    user
  );
  return await provider.waitForTransaction(transaction.hash);
}

export async function tradeItemNotApproved(index, quantity, user) {
  const itemsHandler = itemsContract();
  const traderHandler = traderContract();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return await itemsHandler
    .setApprovalForAll(traderHandler.address, true)
    .then((response) => {
      provider.waitForTransaction(response.hash).then(() => {
        traderHandler.tradeItem(index, quantity[index], user);
      });
    });
}

export async function sendToDungeon(selectedMonsters) {
  const dungeonHandler = dungeonContract();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const transaction = await dungeonHandler.startDungeon(selectedMonsters);
  return await provider.waitForTransaction(transaction.hash);
}

export async function finishDungeon() {
  const dungeonHandler = dungeonContract();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const transaction = await dungeonHandler.finishDungeon();
  return await provider.waitForTransaction(transaction.hash);
}

export async function energyPotion(monster) {
  const monsterGameHandler = monsterGameContract();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const transaction = await monsterGameHandler
    .useEnergyPotion(monster, 1)
    .then(() => {});
  return await provider.waitForTransaction(transaction.hash);
}

export async function feed(monster, amount) {
  const monsterGameHandler = monsterGameContract();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const fee = await monsterGameHandler.FEEDING_FEE();
  const totalAmount = amount * 10;
  const totalFee = totalAmount * ethers.utils.formatEther(fee) * level;
  const transaction = await monsterGameHandler.feedMonster(
    monster,
    totalAmount,
    {
      value: ethers.utils.parseEther(totalFee.toString()),
    }
  );
  return await provider.waitForTransaction(transaction.hash);
}

export async function sendToMission(mission, monstersSelected) {
  const monsterGameHandler = monsterGameContract();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const transaction = await monsterGameHandler.startMission(
    mission,
    monstersSelected
  );
  return await provider.waitForTransaction(transaction.hash);
}

export async function finishMission() {
  const monsterGameHandler = monsterGameContract();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const transaction = await monsterGameHandler.finishMission();
  return await provider.waitForTransaction(transaction.hash);
}

export async function startResting(duration, monsters) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const nurseryHandler = nurseryContract();
  const fee = await nurseryHandler.RESTING_FEE();
  const totalFee = fee * duration * monsters.length;
  const rest = await nurseryHandler.restMonsters(monsters, duration, {
    value: totalFee,
  });

  return await provider.waitForTransaction(rest.hash);
}

export async function finishResting() {
  const nurseryHandler = nurseryContract();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const transaction = await nurseryHandler.finishResting();
  return await provider.waitForTransaction(transaction.hash);
}

export async function registerUser(name, profile) {
  const userDataHandler = usersDataContract();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const nameToBytes = ethers.utils.formatBytes32String(name);
  const profileToBytes = ethers.utils.formatBytes32String(profile.toString());
  const transaction = await userDataHandler.register(
    nameToBytes,
    profileToBytes
  );
  return await provider.waitForTransaction(transaction.hash);
}

export async function smelt(crystalsAmount) {
  const smelterHandler = smelterContract();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const transaction = await smelterHandler.smelt(crystalsAmount);
  return await provider.waitForTransaction(transaction.hash);
}

export async function smeltNotApproved(crystalsAmount) {
  const smelterHandler = smelterContract();
  const itemsHandler = itemsContract();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return await itemsHandler
    .setApprovalAll(smelterHandler.address, user)
    .then((response) => {
      provider.waitForTransaction(response.hash).then(() => {
        smelterHandler.smelt(crystalsAmount);
      });
    });
}

export async function finishSmelt() {
  const smelterHandler = smelterContract();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const transaction = await smelterHandler.finishSmelting();
  return await provider.waitForTransaction(transaction.hash);
}
