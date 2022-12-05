import { ethers } from "ethers";

const useMetamask = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider;
};

export default useMetamask;
