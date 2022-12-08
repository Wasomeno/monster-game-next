import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { usersDataContract } from "../../hooks/useContract";
import { config } from "./queryConfig";

const useUserDetails = () => {
  const { address: user } = useAccount();
  console.log(user);
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

export const useUserStatus = () => {
  const { address: user } = useAccount();
  const userDataHandler = usersDataContract();
  const userStatus = useQuery(
    ["userStatus", user],
    async () => {
      const status = await userDataHandler.registrationStatus(user);
      return status;
    },
    config
  );
  return userStatus;
};

export default useUserDetails;
