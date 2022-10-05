import { ChainId } from 'eotc-bscswap-sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.ROPSTEN]: '0x53C43764255c17BD724F74c4eF150724AC50a3ed',
  [ChainId.KOVAN]: '0x2cc8688C5f75E365aaEEb4ea8D6a480405A48D2A',
  [ChainId.RINKEBY]: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
  [ChainId.GÖRLI]: '0x77dCa2C955b15e9dE4dbBCf1246B4B85b651e50e',
  [ChainId.BSC]: '0x33af15b61156d6908ca544909a58b0800B9A3B25',
  [ChainId.BSC_TSET]: '0x67f17418A8356F95D644aCa412E67cC08d50Ab92',
  [ChainId.MATIC]: '0xB7c5FC914d68F3E6C73ef633E041C73D1cf5e430'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
