import { WarpFactory } from 'warp-contracts'
import { transactionId } from './transactionid'
import wallet from './testwallet'
import { DeployPlugin } from 'warp-contracts-plugin-deploy'

/*
*  environment can be 'local' | 'testnet' | 'mainnet' | 'custom';
*/

const environment = process.env.NEXT_PUBLIC_WARPENV || 'testnet'
let warp
let contract

async function getContract() {
  if (environment == 'testnet') {
    warp = WarpFactory.forTestnet().use(new DeployPlugin())
    contract = warp.contract(transactionId).connect(wallet)
  } else if (environment === 'mainnet') {
    warp = WarpFactory.forMainnet().use(new DeployPlugin())
    contract = warp.contract(transactionId).connect(wallet)
  } else {
    throw new Error('Environment configured improperly...')
  }
  return contract
}

export {
  getContract
}
