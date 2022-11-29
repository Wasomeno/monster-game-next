import { ethers } from "ethers";
import {
  itemsContract,
  monsterContract,
  monsterGameContract,
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
