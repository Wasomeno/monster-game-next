import { useContract, useProvider, useSigner } from "wagmi";

import DungeonABI from "../abi/Dungeon.json";
import ItemsABI from "../abi/Items.json";
import MonsterGameABI from "../abi/MonsterGame.json";
import MonsterABI from "../abi/Monsters.json";
import NurseryABI from "../abi/Nursery.json";
import SmelterABI from "../abi/Smelter.json";
import TraderABI from "../abi/Trader.json";
import UsersDataABI from "../abi/UsersData.json";

const createContract = ({ contractAddress, abi }) => {
  const provider = useProvider();
  const { data: signer, isLoading } = useSigner();
  return useContract({
    address: contractAddress,
    abi: abi,
    signerOrProvider: !isLoading ? signer : provider,
  });
};

export const monsterContract = () => {
  return createContract({
    contractAddress: process.env.MONSTER_CONTRACT_ADDRESS,
    abi: MonsterABI.abi,
  });
};

export const monsterGameContract = () => {
  return createContract({
    contractAddress: process.env.MONSTER_GAME_CONTRACT_ADDRESS,
    abi: MonsterGameABI.abi,
  });
};

export const nurseryContract = () => {
  return createContract({
    contractAddress: process.env.NURSERY_CONTRACT_ADDRESS,
    abi: NurseryABI.abi,
  });
};

export const dungeonContract = () => {
  return createContract({
    contractAddress: process.env.DUNGEON_CONTRACT_ADDRESS,
    abi: DungeonABI.abi,
  });
};

export const itemsContract = () => {
  return createContract({
    contractAddress: process.env.ITEMS_CONTRACT_ADDRESS,
    abi: ItemsABI.abi,
  });
};

export const traderContract = () => {
  return createContract({
    contractAddress: process.env.TRADER_CONTRACT_ADDRESS,
    abi: TraderABI.abi,
  });
};

export const smelterContract = () => {
  return createContract({
    contractAddress: process.env.SMELTER_CONTRACT_ADDRESS,
    abi: SmelterABI.abi,
  });
};

export const usersDataContract = () => {
  return createContract({
    contractAddress: process.env.USERS_DATA_CONTRACT_ADDRESS,
    abi: UsersDataABI.abi,
  });
};
