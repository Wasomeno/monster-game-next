import React from "react";
import { smelterContract } from "../../../hooks/useContract";

const useCrystalsSmelter = () => {
  const smelterHandler = smelterContract();
  return async () => await smelterHandler.smeltDetails(user);
};

export default useCrystalsSmelter;
