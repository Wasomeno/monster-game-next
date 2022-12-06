import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { usersDataContract } from "../../hooks/useContract";

const useUserDetails = () => {
  const { address: user } = useAccount();
  const userDataHandler = usersDataContract();
  const { data, isLoading, isError } = useQuery(
    ["userDetails", user],
    async () => {
      const details = await userDataHandler.userDataDetails(user);
      return details;
    }
  );

  return { data: data, isLoading: isLoading, isError: isError };
};

export const useUserStatus = () => {
  const { address: user } = useAccount();
  const userDataHandler = usersDataContract();
  const { data, isLoading, isError } = useQuery(
    ["userStatus", user],
    async () => {
      const status = await userDataHandler.registrationStatus(user);
      return status;
    }
  );

  return { data: data, isLoading: isLoading, isError: isError };
};

export default useUserDetails;
