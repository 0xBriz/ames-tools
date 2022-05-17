import { ethers } from 'ethers';
import { ERC20_ABI } from 'src/lib/abis/erc20-abi';

export const BUSD_ADDRESS = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'

export let BusdToken = new ethers.Contract(BUSD_ADDRESS, ERC20_ABI);
