import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { smelterContract } from "../../../hooks/useContract";
import { config } from "./queryConfig";

function useCrystalsSmelter() {
  const { address: user } = useAccount();
  const smelterHandler = smelterContract();
  const crystals = useQuery(
    ["crystalsSmelter", user],
    async () => {
      return await smelterHandler.smeltDetails(user);
    },
    config
  );
  return crystals;
}

export default useCrystalsSmelter;
