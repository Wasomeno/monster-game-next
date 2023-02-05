/* eslint-disable react-hooks/rules-of-hooks */
import ethers from "ethers";
import { useAccount, useMutation } from "wagmi";

import { invalidateQuery } from "../../../contexts/reactQueryClient";
import { usersDataContract } from "../../../hooks/useContract";
import useMetamask from "../../../hooks/useMetamask";
import { mutationSideEfffects } from "./mutationSideEffects";

const queryKeys = (user) => [
  ["userStatus", user],
  ["userDetails", user],
];

const registerUser = ({ name, profileImage }) => {
  const { address: user } = useAccount();
  const provider = useMetamask();
  const userDataHandler = usersDataContract();
  const invalidateQueryKeys = queryKeys(user);
  const { mutate } = useMutation(async () => {
    const nameToBytes = ethers.utils.formatBytes32String(name);
    const profileToBytes = ethers.utils.formatBytes32String(
      profileImage.toString()
    );
    const transaction = await userDataHandler.register(
      nameToBytes,
      profileToBytes
    );
    return await provider.waitForTransaction(transaction.hash);
  }, mutationSideEfffects("Registering User", invalidateQueryKeys));

  return mutate;
};

export default registerUser;
