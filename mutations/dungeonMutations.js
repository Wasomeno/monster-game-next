import { useMutation } from "@tanstack/react-query";
import { waitForTransaction } from "@wagmi/core";
import { dungeonContract } from "../hooks/useContract";
import { finishDungeonSides, monstersToDungeonsSides } from "./sideffects";

export function sendToDungeon(selectedMonsters) {
  const dungeonHandler = dungeonContract();
  const { mutate } = useMutation(async () => {
    const transaction = await dungeonHandler.startDungeon(selectedMonsters);
    return await waitForTransaction({ hash: transaction.hash });
  }, monstersToDungeonsSides());

  return mutate;
}

export function finishDungeon() {
  const dungeonHandler = dungeonContract();
  const { mutate } = useMutation(async () => {
    const transaction = await dungeonHandler.finishDungeon();
    return await waitForTransaction(transaction.hash);
  }, finishDungeonSides());

  return mutate;
}
