import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { nurseryContract } from "../hooks/useContract";
import { finishRestingSides, startRestingSides } from "./sideffects";

export function startResting({ duration, monsters }) {
  const { address: user } = useAccount();
  const nurseryHandler = nurseryContract();
  const { mutate } = useMutation(async () => {
    const fee = await nurseryHandler.RESTING_FEE();
    const totalFee = fee * duration * monsters.length;
    const rest = await nurseryHandler.restMonsters(monsters, duration, {
      value: totalFee,
    });
    return await waitForTransaction(rest.hash);
  }, startRestingSides(user));
  return mutate;
}

export async function finishResting() {
  const { address: user } = useAccount();
  const nurseryHandler = nurseryContract();
  const { mutate } = useMutation(async () => {
    const transaction = await nurseryHandler.finishResting();
    return await waitForTransaction(transaction.hash);
  }, finishRestingSides(user));
  return mutate;
}
