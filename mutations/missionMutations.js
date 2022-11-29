import { waitForTransaction } from "@wagmi/core";
import { useAccount, useMutation } from "wagmi";
import { monsterGameContract } from "../hooks/useContract";
import { finishMissionSides, monstersToMissionSides } from "./sideffects";

export function sendToMission({ mission, monstersSelected }) {
  const { address: user } = useAccount();
  const monsterGameHandler = monsterGameContract();
  const { mutate } = useMutation(async () => {
    const transaction = await monsterGameHandler.startMission(
      mission,
      monstersSelected
    );
    return await waitForTransaction(transaction.hash);
  }, monstersToMissionSides(user));
  return mutate;
}

export function finishMission() {
  const { address: user } = useAccount();
  const monsterGameHandler = monsterGameContract();
  const { mutate } = useMutation(async () => {
    const transaction = await monsterGameHandler.finishMission();
    return await waitForTransaction(transaction.hash);
  }, finishMissionSides(user));
  return mutate;
}
