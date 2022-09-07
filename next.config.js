const { m } = require("framer-motion");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const env = {
  NURSERY_CONTRACT_ADDRESS: "0xCe1641A6d54F67859AF935164E6Aa1F1Bd1a463A",
  MONSTER_CONTRACT_ADDRESS: "0x90B9aCC7C0601224310f3aFCaa451c0D545a1b41",
  DUNGEON_CONTRACT_ADDRESS: "0x4f46037fEffa0433E013b77d131019b02042197A",
  ITEMS_CONTRACT_ADDRESS: "0x633c04c362381BbD1C9B8762065318Cb4F207989",
  TRADER_CONTRACT_ADDRESS: "0x3CCEc613890E907ACF32a8Eb4DbD18DB700C4b64",
  MONSTER_CONTRACT_ADDRESS: "0x90B9aCC7C0601224310f3aFCaa451c0D545a1b41",
};

module.exports = () => {
  nextConfig, env;

  return {
    env,
  };
};
