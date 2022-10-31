import { Contract } from '@ethersproject/contracts'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { BigNumber } from '@ethersproject/bignumber'
import IUniswapV2Router02ABIJSON from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import { AGGREGATION_ADDRESS, CONTRACTS } from '../constants'
import { ChainId, JSBI, Percent, Token, CurrencyAmount, Currency } from 'eotc-bscswap-sdk'
import { TokenAddressMap } from '../state/lists/hooks'
import IAggregationABI from '../constants/abis/IAggregationABI.json'
const { abi: IUniswapV2Router02ABI } = IUniswapV2Router02ABIJSON
// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

const ETHERSCAN_PREFIXES: { [chainId in ChainId]: string } = {
  1: 'etherscan.io',
  3: 'ropsten.etherscan.io',
  4: 'rinkeby.etherscan.io',
  5: 'goerli.etherscan.io',
  42: 'kovan.etherscan.io',
  56: 'bscscan.com',
  97: 'testnet.bscscan.com',
  137: 'polygonscan.com',
  [ChainId.OKEXCHAIN]: 'www.oklink.com/zh-cn/okc',
  [ChainId.HUOBI]: 'www.hecoinfo.com',
  [ChainId.OPTIMISM]: 'optimistic.etherscan.io',
  [ChainId.ARBITRUM]: 'arbiscan.io',
  [ChainId.GNOSIS]: 'gnosisscan.io',
  [ChainId.AVALANCHE]: 'subnets.avax.network',
  [ChainId.FANTOM]: 'ftmscan.com',
  [ChainId.KLAYTN]: 'scope.klaytn.com',
  [ChainId.AURORA]: 'aurorascan.dev'
}

export function getEtherscanLink(chainId: ChainId, data: string, type: 'transaction' | 'token' | 'address'): string {
  const prefix = `https://${ETHERSCAN_PREFIXES[chainId] || ETHERSCAN_PREFIXES[1]}`

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

// add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000))
}

// converts a basis points value to a sdk percent
export function basisPointsToPercent(num: number): Percent {
  return new Percent(JSBI.BigInt(num), JSBI.BigInt(10000))
}

export function calculateSlippageAmount(value: CurrencyAmount, slippage: number): [JSBI, JSBI] {
  if (slippage < 0 || slippage > 10000) {
    throw Error(`Unexpected slippage value: ${slippage}`)
  }
  return [
    JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 - slippage)), JSBI.BigInt(10000)),
    JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 + slippage)), JSBI.BigInt(10000))
  ]
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

// account is optional
export function getRouterContract(_: number, library: Web3Provider, account?: string): Contract {
  const routerAddress = CONTRACTS[_]['EOTC'].ROUTER
  return getContract(routerAddress, IUniswapV2Router02ABI, library, account)
  // return getContract(ROUTER_ADDRESS, IUniswapV2Router02ABI, library, account)
}
export function getRouterContractPro(_: number, library: Web3Provider, account?: string, dexName = 'EOTC'): Contract {
  return getContract(CONTRACTS[_][dexName].ROUTER, IUniswapV2Router02ABI, library, account)
}
export function getAggregationContract(chainId: number, library: Web3Provider, account?: string): Contract {
  return getContract(AGGREGATION_ADDRESS, IAggregationABI, library, account)
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function isTokenOnList(defaultTokens: TokenAddressMap, currency?: Currency): boolean {
  if (currency === Currency.ETHER) return true
  return Boolean(currency instanceof Token && defaultTokens[currency.chainId]?.[currency.address])
}
// 科学计数法转数值 - 处理 1e-7 这类精度问题
export function getFullNum(num: number): any {
  // 处理非数字
  if (isNaN(num)) {
    return num
  }
  // 处理不需要转换的数字
  const str = String(num)
  if (!/e/i.test(str)) {
    return num
  }
  console.log(
    Number(num)
      .toFixed(18)
      .replace(/\.?0+$/, '')
  )
  return Number(num)
    .toFixed(18)
    .replace(/\.?0+$/, '')
}

// 返回小数位后几位 截取
// number 数值
// p 位数
export function toFixed(number: number, pp: number) {
  let num = isNaN(number) || !number ? 0 : number
  const p = isNaN(pp) || !pp ? 0 : pp
  num = getFullNum(num)
  var n = (num + '').split('.') // eslint-disable-line
  var x = n.length > 1 ? n[1] : '' // eslint-disable-line
  if (x.length > p) {
    // eslint-disable-line
    x = x.substr(0, p) // eslint-disable-line
  } else {
    // eslint-disable-line
    x += Array(p - x.length + 1).join('0') // eslint-disable-line
  } // eslint-disable-line
  return n[0] + (x == '' ? '' : '.' + x) // eslint-disable-line
}
