/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

const env = {
  NURSERY_CONTRACT_ADDRESS: "0x270d5F0D85AA236ea846105801e658b19046be52",
  MONSTER_GAME_CONTRACT_ADDRESS: "0x0DdE6e52f37Aed15b7da7f7BA1009bd57EcEE117",
  DUNGEON_CONTRACT_ADDRESS: "0xf270683a71354f930A063949B1Bc4829e3882A82",
  ITEMS_CONTRACT_ADDRESS: "0x7CB525f3096ce9C0bdbF538617F8dE25F761f923",
  TRADER_CONTRACT_ADDRESS: "0x99B36427E441af4E0a481b96411265C632204364",
  MONSTER_CONTRACT_ADDRESS: "0x7520EF60B72cD3AA6C56fFd07838E67A522Ea1F4",
  MONSTER_TOKEN_CONTRACT_ADDRESS: "0x7dE5DdbeEcBcCF53cf93664c4e02aC4D647f39e3",
  SMELTER_CONTRACT_ADDRESS: "0x2Cbb5abDB8a168E5fb7964677229D1Ae3cbE83A5",
  USERS_DATA_CONTRACT_ADDRESS: "0xCBc02438Fd977754179eAFdDb621fab207D5587c",
};

module.exports = () => {
  nextConfig, env;

  return {
    env,
  };
};
