import { ethers } from "ethers";

export default function () {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider;
}
