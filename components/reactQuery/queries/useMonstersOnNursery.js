import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { nurseryContract } from "../../../hooks/useContract";
import { config } from "./queryConfig";

function useMonstersOnNursery() {
  const { address: user } = useAccount();
  const nurseryHandler = nurseryContract();
  const monsters = useQuery(
    ["monstersOnNursery", user],
    async () => await nurseryHandler.getRestingMonsters(user),
    config
  );
  return monsters;
}

export default useMonstersOnNursery;
