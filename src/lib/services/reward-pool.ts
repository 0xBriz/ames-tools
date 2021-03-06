import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { AMES_CONTRACTS } from '../data/contracts';
import { FormattedResult } from 'src/lib/utils/formatting';
import { awaitTransactionComplete } from 'src/lib/utils/web3-utils';
import { REWARD_POOL_ABI } from '../abis/reward-pool-abi';
import { Web3Service } from './web3.service';

@Injectable({ providedIn: 'root' })
export class RewardPool {
  contract: ethers.Contract;

  constructor(private readonly web3: Web3Service) {
    this.web3.web3.subscribe((web3Info) => {
      if (web3Info) {
        this.contract = new ethers.Contract(
          AMES_CONTRACTS[web3Info.chainId].RewardPool,
          REWARD_POOL_ABI,
          this.web3.web3Info.signer
        );
      }
    });
  }

  userInfo(poolId: number, user: string) {
    return this.contract.userInfo(poolId, user);
  }

  async deposit(poolId: number, amount: ethers.BigNumber) {
    const tx = await this.contract.deposit(poolId, amount);
    return await awaitTransactionComplete(tx);
  }

  poolInfo(poolId: number) {
    return this.contract.poolInfo(poolId);
  }

  async totalAllocPoints() {
    return new FormattedResult(await this.contract.totalAllocPoint());
  }

  async rewardsPerSecond() {
    return new FormattedResult(await this.contract.tSharePerSecond());
  }
}
