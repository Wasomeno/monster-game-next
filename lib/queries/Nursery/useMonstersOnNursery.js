import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { nurseryContract } from "../../../hooks/useContract";

const useMonstersOnNursery = () => {
  const { address: user } = useAccount();
  const nurseryHandler = nurseryContract();
  const { data, isLoading, isError } = useQuery(
    ["monstersOnNursery", user],
    async () => await nurseryHandler.getRestingMonsters(user)
  );
  return { data: data, isLoading: isLoading, isError: isError };
};

export default useMonstersOnNursery;
