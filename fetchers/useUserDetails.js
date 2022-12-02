import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { usersDataContract } from "../hooks/useContract";

const useUserDetails = () => {
  const { address: user } = useAccount();
  const userDataHandler = usersDataContract();
  const { data, isLoading, isError } = useQuery(
    ["userDetails", user],
    async () => {
      const status = await userDataHandler.registrationStatus(user);
      const details = await userDataHandler.userDataDetails(user);
      return { status: status, ...details };
    }
  );

  return { data: data, isLoading: isLoading, isError: isError };
};

export default useUserDetails;
