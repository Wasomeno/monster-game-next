import React from "react";
import { ethers } from "ethers";
import NurseryABI from "../abi/Nursery.json";
import MonsterABI from "../abi/Monsters.json";
import DungeonABI from "../abi/Dungeon.json";
import TraderABI from "../abi/Trader.json";
import ItemsABI from "../abi/Items.json";
import SmelterABI from "../abi/Smelter.json";
import UsersDataABI from "../abi/UsersData.json";
import MonsterGameABI from "../abi/MonsterGame.json";

export function nurseryContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const nurseryContract = new ethers.Contract(
    process.env.NURSERY_CONTRACT_ADDRESS,
    NurseryABI.abi,
    signer
  );
  return nurseryContract;
}

export function monsterContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const monsterContract = new ethers.Contract(
    process.env.MONSTER_CONTRACT_ADDRESS,
    MonsterABI.abi,
    signer
  );

  return monsterContract;
}

export function monsterGameContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const monsterGameContract = new ethers.Contract(
    process.env.MONSTER_GAME_CONTRACT_ADDRESS,
    MonsterGameABI.abi,
    signer
  );

  return monsterGameContract;
}

export function dungeonContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const dungeonContract = new ethers.Contract(
    process.env.DUNGEON_CONTRACT_ADDRESS,
    DungeonABI.abi,
    signer
  );

  return dungeonContract;
}

export function itemsContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    process.env.ITEMS_CONTRACT_ADDRESS,
    ItemsABI.abi,
    signer
  );

  return contract;
}

export function traderContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const traderContract = new ethers.Contract(
    process.env.TRADER_CONTRACT_ADDRESS,
    TraderABI.abi,
    signer
  );

  return traderContract;
}

export function smelterContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    process.env.SMELTER_CONTRACT_ADDRESS,
    SmelterABI.abi,
    signer
  );
  return contract;
}

export function usersDataContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    process.env.USERS_DATA_CONTRACT_ADDRESS,
    UsersDataABI.abi,
    signer
  );
  return contract;
}
