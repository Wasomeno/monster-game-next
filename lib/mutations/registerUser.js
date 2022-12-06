import { waitForTransaction } from "@wagmi/core";
import { formatBytes32String } from "ethers/lib/utils.js";
import { useAccount, useMutation } from "wagmi";
import { invalidateQuery } from "../../contexts/reactQueryClient";
import { usersDataContract } from "../../hooks/useContract";
import { useLoading, useToast } from "../../stores/stores";

const registerUser = ({ name, profileImage }) => {
  const { address: user } = useAccount();
  const userDataHandler = usersDataContract();
  const { mutate } = useMutation(async () => {
    const nameToBytes = formatBytes32String(name);
    const profileToBytes = formatBytes32String(profileImage.toString());
    const transaction = await userDataHandler.register(
      nameToBytes,
      profileToBytes
    );
    return await waitForTransaction(transaction.hash);
  }, registerSides(user));

  return mutate;
};

export const registerSides = (user) => {
  const toggleLoading = useLoading();
  const [toastSuccess, toastError] = useToast();
  return {
    onMutate: () => toggleLoading("Registering user"),
    onSettled: () => toggleLoading(),
    onSuccess: () => {
      toastSuccess("Register Success! Welcome to Monster Game");
      invalidateQuery(["registerStatus", user]);
      invalidateQuery(["userDetails", user]);
    },
    onError: (error) => toastError(error.reason),
  };
};

export default registerUser;
