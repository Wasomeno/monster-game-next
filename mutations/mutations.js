import { ethers } from "ethers";
import {
  dungeonContract,
  itemsContract,
  monsterContract,
  monsterGameContract,
  traderContract,
} from "../hooks/useContract";

const dungeonHandler = dungeonContract();
const monsterGameHandler = monsterGameContract();
const monsterHandler = monsterContract();
const traderHandler = traderContract();
const itemsHandler = itemsContract();

export async function summonMonster(quantity) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const price = await monsterHandler.SUMMON_PRICE();
  const formattedPrice = ethers.utils.formatEther(price);
  const totalCost = formattedPrice * quantity;

  const summon = await monsterHandler.summon(quantity, {
    value: ethers.utils.parseEther(totalCost.toString()),
  });

  const waitTransaction = await provider.waitForTransaction(summon.hash);
  return waitTransaction;
}

export async function buy(itemsSelected, quantity, user, total) {
  await traderHandler.buyItems(itemsSelected, quantity, user, {
    value: total,
  });
}

export async function tradeItemApproved(index, quantity, user) {
  return await traderHandler.tradeItem(index, quantity[index], user);
}

export async function tradeItemNotApproved(index, quantity, user) {
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
  return await dungeonHandler.startDungeon(selectedMonsters);
}

export async function finishDungeon() {
  return await dungeonHandler.finishDungeon();
}

export async function energyPotion(monster) {
  await monsterGameHandler.useEnergyPotion(monster, 1).then(() => {});
}

export async function feed(monster, amount) {
  const fee = await monsterGameHandler.FEEDING_FEE();
  const totalAmount = amount * 10;
  const totalFee = totalAmount * ethers.utils.formatEther(fee) * level;
  await monsterGameHandler.feedMonster(monster, totalAmount, {
    value: ethers.utils.parseEther(totalFee.toString()),
  });
}
