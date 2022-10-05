import { ChainId, JSBI, Pair, Percent, Token, Trade, WETH } from 'eotc-bscswap-sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { fortmatic, injected, portis, walletconnect, walletlink } from '../connectors'
import { SupportedChainId } from './chains'
// import { PairState } from '../data/Reserves'
import { BSC_AGGREGATION, MAINNET_AGGREGATION, POLYGON_AGGREGATION } from './Aggregations'
export const ROUTER_ADDRESS = '0xbD537A5afBB63295F1cab9A7A670415e153a91B9'
export const AGGREGATION_ADDRESS = '0x2ae87E829a0bA3d9d7cFDD47128f43917fF5556C'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin')
export const USDC = new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C')
export const USDT = new Token(ChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD')
export const COMP = new Token(ChainId.MAINNET, '0xc00e94Cb662C3520282E6f5717214004A7f26888', 18, 'COMP', 'Compound')
export const MKR = new Token(ChainId.MAINNET, '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', 18, 'MKR', 'Maker')
export const AMPL = new Token(ChainId.MAINNET, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9, 'AMPL', 'Ampleforth')

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.ROPSTEN]: [WETH[ChainId.ROPSTEN]],
  [ChainId.RINKEBY]: [WETH[ChainId.RINKEBY]],
  [ChainId.GÖRLI]: [WETH[ChainId.GÖRLI]],
  [ChainId.KOVAN]: [WETH[ChainId.KOVAN]],
  [ChainId.BSC]: [WETH[ChainId.BSC]],
  [ChainId.BSC_TSET]: [WETH[ChainId.BSC_TSET]],
  [ChainId.MATIC]: [WETH[ChainId.MATIC]]
}
interface CONTRACT {
  [key: string]: {
    FACTORY: string
    ROUTER: string
    INIT_CODE_HASH: string
    Icon: string
  }
}
export const CONTRACT: CONTRACT = {
  Pancake: {
    FACTORY: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
    ROUTER: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
    INIT_CODE_HASH: '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5',
    Icon: require('../assets/images/swapLogo/pancake.png')
  },
  Suhsi: {
    FACTORY: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
    ROUTER: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    INIT_CODE_HASH: '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
    Icon: require('../assets/images/swapLogo/sushi.png')
  },
  EOTC: {
    FACTORY: '0x73857Fa9a849Cd6DC8387C37f54Ad0F56B575eA2',
    ROUTER: '0xbD537A5afBB63295F1cab9A7A670415e153a91B9',
    INIT_CODE_HASH: '0xa9fbfced95fed0f4cbe56a6f056f7f895c31bee594b6a273f043d2ae917102e3',
    Icon: require('../assets/images/eotc.png')
  },
  Mdex: {
    FACTORY: '0x3CD1C46068dAEa5Ebb0d3f55F6915B10648062B8',
    ROUTER: '0x0384E9ad329396C3A6A401243Ca71633B2bC4333',
    INIT_CODE_HASH: '0x0d994d996174b05cfc7bed897dc1b20b4c458fc8d64fe98bc78b3c64a6b4d093',
    Icon: require('../assets/images/swapLogo/mdex.png')
  },
  Julswap: {
    FACTORY: '0x553990F2CBA90272390f62C5BDb1681fFc899675',
    ROUTER: '0xbd67d157502A23309Db761c41965600c2Ec788b2',
    INIT_CODE_HASH: '0xb1e98e21a5335633815a8cfb3b580071c2e4561c50afd57a8746def9ed890b18',
    Icon: require('../assets/images/swapLogo/Jul.png')
  },
  BakerySwap: {
    FACTORY: '0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7',
    ROUTER: '0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F',
    INIT_CODE_HASH: '0xe2e87433120e32c4738a7d8f3271f3d872cbe16241d67537139158d90bac61d3',
    Icon: require('../assets/images/swapLogo/Bakery.png')
  },
  ApeSwap: {
    FACTORY: '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
    ROUTER: '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7',
    INIT_CODE_HASH: '0xf4ccce374816856d11f00e4069e7cada164065686fbef53c6167a63ec2fd8c5b',
    Icon: require('../assets/images/swapLogo/Ape.png')
  },
  BabySwap: {
    FACTORY: '0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da',
    ROUTER: '0x8317c460C22A9958c27b4B6403b98d2Ef4E2ad32',
    INIT_CODE_HASH: '0x48c8bec5512d397a5d512fbb7d83d515e7b6d91e9838730bd1aa1b16575da7f5',
    Icon: require('../assets/images/swapLogo/baby.png')
  }
}
export const CONTRACTS: { [key in SupportedChainId]: CONTRACT } = {
  [SupportedChainId.MAINNET]: MAINNET_AGGREGATION,
  [SupportedChainId.ROPSTEN]: CONTRACT,
  [SupportedChainId.RINKEBY]: CONTRACT,
  [SupportedChainId.GOERLI]: CONTRACT,
  [SupportedChainId.KOVAN]: CONTRACT,
  [SupportedChainId.POLYGON]: POLYGON_AGGREGATION,
  [SupportedChainId.POLYGON_MUMBAI]: CONTRACT,
  [SupportedChainId.CELO]: CONTRACT,
  [SupportedChainId.CELO_ALFAJORES]: CONTRACT,
  [SupportedChainId.ARBITRUM_ONE]: CONTRACT,
  [SupportedChainId.ARBITRUM_RINKEBY]: CONTRACT,
  [SupportedChainId.OPTIMISM]: CONTRACT,
  [SupportedChainId.OPTIMISTIC_KOVAN]: CONTRACT,
  [SupportedChainId.BSC]: BSC_AGGREGATION
}
export interface TradesItem {
  name: string
  trade: Trade
  pairs: Pair[]
  icon?: string
}
export type Trades = TradesItem[]
// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT, COMP, MKR]
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {
    [AMPL.address]: [DAI, WETH[ChainId.MAINNET]]
  }
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT]
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT]
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [
      new Token(ChainId.MAINNET, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai'),
      new Token(ChainId.MAINNET, '0x39AA39c021dfbaE8faC545936693aC917d5E7563', 8, 'cUSDC', 'Compound USD Coin')
    ],
    [USDC, USDT],
    [DAI, USDT]
  ]
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnectIcon.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5'
  },
  COINBASE_LINK: {
    name: 'Open in Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Open in Coinbase Wallet app.',
    href: 'https://go.cb-w.com/mtUDhEZPy1',
    color: '#315CF5',
    mobile: true,
    mobileOnly: true
  },
  FORTMATIC: {
    connector: fortmatic,
    name: 'Fortmatic',
    iconName: 'fortmaticIcon.png',
    description: 'Login using Fortmatic hosted wallet',
    href: null,
    color: '#6748FF',
    mobile: true
  },
  Portis: {
    connector: portis,
    name: 'Portis',
    iconName: 'portisIcon.png',
    description: 'Login using Portis hosted wallet',
    href: null,
    color: '#4A6C9B',
    mobile: true
  }
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(75), JSBI.BigInt(10000))
