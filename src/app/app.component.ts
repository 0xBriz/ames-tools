import { Component } from '@angular/core';
import { ChainService } from 'src/lib/services/chain.service';
import { TokenService } from 'src/lib/services/token.service';
import { Web3Service } from 'src/lib/services/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public readonly web3Service: Web3Service,
    public readonly chainService: ChainService,
    public readonly tokenService: TokenService,
  ) {
       this.web3Service.web3.subscribe((info) => {
      if (!info) {
        //this.dataWatch.stopWatchingPrices();
      }
    });

    this.web3Service.chain.subscribe((chain) => {
      if (chain) {
       // this.dataWatch.stopWatchingPrices();
       // this.dataWatch.watchTokenPrices(chain.chainId);
      }
    });
  }
}
