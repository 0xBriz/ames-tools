import { ChainBaseConfig } from '../types/chain.types';
import { SECONDS_IN_YEAR } from '../utils/time-constants';

export const BINANCE_SMART_CHAIN: ChainBaseConfig = {
  name: 'BSC',
  nativeToken: { coinGeckoId: 'binancecoin' },
  chainId: 56,
  blockTimeSeconds: 3,
  blocksPerYear: SECONDS_IN_YEAR / 3,
  compoundsGuessimate: 2, //  Hard coded until API is set up
};

export const HARDHAT_TEST_CHAIN: ChainBaseConfig = {
  name: 'Hardhat',
  nativeToken: { coinGeckoId: 'binancecoin' },
  chainId: 31337,
  blockTimeSeconds: 3,
  blocksPerYear: SECONDS_IN_YEAR / 3,
  compoundsGuessimate: 2, //  Hard coded until API is set up
};

export const CHAIN_ID_MAP = {
  [BINANCE_SMART_CHAIN.chainId]: {
    ...BINANCE_SMART_CHAIN,
  },
  [HARDHAT_TEST_CHAIN.chainId]: {
    ...HARDHAT_TEST_CHAIN,
  },
};

export const CURRENT_CHAINS: ChainBaseConfig[] = [
  BINANCE_SMART_CHAIN,
  HARDHAT_TEST_CHAIN,
  // {
  //   name: 'Polygon',
  //   nativeToken: { coinGeckoId: 'matic-network' },
  // },
  // {
  //   name: 'Avalanche',
  //   nativeToken: { coinGeckoId: 'avalanche-2' },
  //   chainId: 43114,
  // },
  // {
  //   name: 'Fantom',
  //   nativeToken: { coinGeckoId: 'fantom' },
  //   chainId: 250,
  // },
  // {
  //   name: 'Near',
  //   nativeToken: { coinGeckoId: 'near' },
  // },
  // {
  //   name: 'Aurora',
  //   nativeToken: { coinGeckoId: 'aurora-near' },
  // },
  // {
  //   name: 'Oasis',
  //   nativeToken: { coinGeckoId: 'oasis-network' },
  // },
];
