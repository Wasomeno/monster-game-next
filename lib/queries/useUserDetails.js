import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useAccount } from "wagmi";
import { usersDataContract } from "../../hooks/useContract";
import { config } from "./queryConfig";

const useUserDetails = () => {
  const { address: user } = useAccount();
  const userDataHandler = usersDataContract();
  const userDetails = useQuery(
    ["userDetails", user],
    async () => {
      const details = await userDataHandler.userDataDetails(user);
      return details;
    },
    config
  );
  return userDetails;
};

export const useUserStatus = (address = "") => {
  const userDataHandler = usersDataContract();
  const userStatus = useQuery(
    ["userStatus", address],
    async () => {
      return await userDataHandler.registrationStatus(address);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );
  return userStatus;
};

export default useUserDetails;
