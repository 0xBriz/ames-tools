import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import {
  BUSD_ADDRESS,
  BusdToken,
} from '../data/data';
import { FormattedResult } from 'src/lib/utils/formatting';
import { Web3Service } from './web3.service';
import { awaitTransactionComplete } from 'src/lib/utils/web3-utils';
import {

  PAIR_ASHARE_BUSD_BSC,
  PAIR_AMETHYST_BUSD_BSC,
} from 'src/lib/data/pairs';
import { BehaviorSubject } from 'rxjs';
import { TokenPriceInfo } from 'src/lib/types/token.types';
import { PRICE_TOKENS } from 'src/lib/data/price-tokens';
import { createPairContract } from 'src/lib/utils/contract.utils';
import { Pair } from 'src/lib/types/classes/pair';
import { ERC20 } from 'src/lib/types/classes/erc20';
import { TokenInputOption } from 'src/lib/types/zap.types';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private contractRefs: { [address: string]: ethers.Contract } = {};

  private _priceTokens = new BehaviorSubject<TokenPriceInfo[]>([]);
  get priceTokens() {
    return this._priceTokens.asObservable();
  }

  constructor(private readonly web3: Web3Service) {
    this.web3.web3.subscribe((web3Info) => {
      if (web3Info) {
        this.setContractRefs();
        this.setPriceTokensInfo(web3Info.chainId);
      }
    });
  }

  setPriceTokens(info: TokenPriceInfo[]) {
    this._priceTokens.next(info);
  }

  getPair(pairAddress: string) {
    return new Pair(pairAddress, this.web3.web3Info.signer);
  }

  getERC20(address: string) {
    return new ERC20(address, this.web3.web3Info.signer);
  }

  async setPriceTokensInfo(chainId: number) {
    const chainTokens = PRICE_TOKENS[chainId];
    if (!chainTokens || !chainTokens.length) {
      this.setPriceTokens([]);
      return;
    }
    const priceTokens: TokenPriceInfo[] = [];
    for (const token of chainTokens) {
      priceTokens.push({
        ...token,
        ...{
          price: await token.getPrice(),
        },
      });
    }

    this.setPriceTokens(priceTokens);
  }

  async getUserTokenBalance(tokenAddress: string) {
    const balance = await this.contractRefs[tokenAddress].balanceOf(
      this.web3.web3Info.userAddress
    );
    return new FormattedResult(balance);
  }

  async setUserTokenBalances(tokens: TokenInputOption[]) {
    for (const token of tokens) {
      token.loadingBalance = true;
      const contract = new ERC20(token.address, this.web3.web3Info.signer);
      const balance = await contract.balanceOf(this.web3.web3Info.userAddress);
      let strBalance = balance.formatEther();

      if (strBalance.length >= 9) {
        strBalance = strBalance.slice(0, 9);
        token.userBalanceUI = Number(strBalance);
        token.userBalanceBN = ethers.utils.parseEther(strBalance);
      } else {
        // Do not show dust values as options for any deposit actions
        token.userBalanceUI = 0;
        token.userBalanceBN = ethers.constants.Zero;
      }

      token.loadingBalance = false;
    }
  }

  getTokenContract(address: string) {
    return this.contractRefs[address];
  }

  async approveTokenIfNeeded(
    tokenAddress: string,
    owner: string,
    spender: string,
    amount: ethers.BigNumber
  ) {
    try {
      const allowance: ethers.BigNumber = await this.contractRefs[
        tokenAddress
      ].allowance(owner, spender);
      if (allowance.lt(amount)) {
        const tx = await this.contractRefs[tokenAddress].approve(
          spender,
          ethers.constants.MaxUint256
        );

        await awaitTransactionComplete(tx);
      }
    } catch (error) {
      throw error;
    }
  }

  private setContractRefs() {
    this.contractRefs[BUSD_ADDRESS] = BusdToken.connect(
      this.web3.web3Info.signer
    );
    this.setPairRefs();
  }

  private setPairRefs() {

    this.contractRefs[PAIR_AMETHYST_BUSD_BSC] = createPairContract(
      PAIR_AMETHYST_BUSD_BSC,
      this.web3.web3Info.signer
    );
    this.contractRefs[PAIR_ASHARE_BUSD_BSC] = createPairContract(
      PAIR_ASHARE_BUSD_BSC,
      this.web3.web3Info.signer
    );
  }
}
