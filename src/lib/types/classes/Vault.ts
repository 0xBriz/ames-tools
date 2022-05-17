import { ethers } from 'ethers';
import { FormattedResult } from 'src/lib/utils/formatting';

export class Vault {
  constructor(public readonly contract: ethers.Contract) {}

  async getPricePerFullShare() {
    return new FormattedResult(await this.contract.getPricePerFullShare());
  }

  async balanceOf(user: string) {
    return new FormattedResult(await this.contract.balanceOf(user));
  }
}
