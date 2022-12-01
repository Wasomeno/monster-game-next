import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { itemsContract } from "../hooks/useContract";

const useApprovalStatus = ({ contractAddress }) => {
  const { address: user } = useAccount();
  const itemsHandler = itemsContract();
  const { data, isLoading, isError } = useQuery(
    ["approvalStatus", user, contractAddress],
    async () => {
      return await itemsHandler.isApprovedForAll(user, contractAddress);
    }
  );
  return { data: data, isLoading: isLoading, isError: isError };
};

export default useApprovalStatus;
