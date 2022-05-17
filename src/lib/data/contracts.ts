import { AmesContract } from '../types/ames-contract.types';
import { REWARD_POOL_ADDRESS_BSC, ZAPPER_ADDRESS_BSC } from './bsc-addresses';
import { BINANCE_SMART_CHAIN, HARDHAT_TEST_CHAIN } from './chains';

export const AMES_CONTRACTS: {
  [chainId: number]: { [name in AmesContract]: string };
} = {
  [BINANCE_SMART_CHAIN.chainId]: {
    Zapper: ZAPPER_ADDRESS_BSC,
    RewardPool: REWARD_POOL_ADDRESS_BSC,
  },
  [HARDHAT_TEST_CHAIN.chainId]: {
    Zapper: ZAPPER_ADDRESS_BSC,
    RewardPool: REWARD_POOL_ADDRESS_BSC,
  },
};
