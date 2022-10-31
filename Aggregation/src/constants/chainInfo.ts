import celoCircleLogoUrl from '../assets/images/celoCircle.png'
import ethereumLogoUrl from '../assets/images/ethereum-logo.png'
// import optimismCircleLogoUrl from '../assets/images/optimismCircle.png'
import polygonCircleLogoUrl from '../assets/images/polygonCircle.png'
import { default as arbitrumCircleLogoUrl, default as arbitrumLogoUrl } from '../assets/svg/arbitrum_logo.svg'
import celoLogo from '../assets/svg/celo_logo.svg'
import optimismLogoUrl from '../assets/svg/optimistic_ethereum.svg'
import polygonMaticLogo from '../assets/svg/polygon-matic-logo.svg'
import bscLogoUrl from '../assets/svg/bnb.svg'
import okxLogoUrl from '../assets/images/okx.png'
import huobiLogoUrl from '../assets/svg/huobi.svg'
import gnosisLogoUrl from '../assets/svg/gnosis.svg'
import avalancheLogoUrl from '../assets/svg/avalanche.svg'
import fantomLogoUrl from '../assets/svg/fantom.svg'
import klaytnLogoUrl from '../assets/svg/klaytn.svg'
import auroraLogoUrl from '../assets/svg/aurora.svg'
import ms from 'ms.macro'
import { colorsDark } from '../theme/colors'

import { SupportedChainId, SupportedL1ChainId, SupportedL2ChainId } from './chains'
import { ARBITRUM_LIST, CELO_LIST, OPTIMISM_LIST } from './lists'

export enum NetworkType {
  L1,
  L2
}

interface BaseChainInfo {
  readonly networkType: NetworkType
  readonly blockWaitMsBeforeWarning?: number
  readonly docs: string
  readonly bridge?: string
  readonly explorer: string
  readonly infoLink: string
  readonly logoUrl: string
  readonly circleLogoUrl?: string
  readonly label: string
  readonly helpCenterUrl?: string
  readonly nativeCurrency: {
    name: string // e.g. 'Goerli ETH',
    symbol: string // e.g. 'gorETH',
    decimals: number // e.g. 18,
  }
  readonly color?: string
  readonly backgroundColor?: string
}

export interface L1ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L1
  readonly defaultListUrl?: string
}

export interface L2ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L2
  readonly bridge: string
  readonly statusPage?: string
  readonly defaultListUrl: string
}

export type ChainInfoMap = { readonly [chainId: number]: L1ChainInfo | L2ChainInfo } & {
  readonly [chainId in SupportedL2ChainId]: L2ChainInfo
} &
  { readonly [chainId in SupportedL1ChainId]: L1ChainInfo } &
  { [key in SupportedChainId]: L1ChainInfo | L2ChainInfo }

const CHAIN_INFO: ChainInfoMap = {
  [SupportedChainId.MAINNET]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Ethereum',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    color: colorsDark.chain_1
  },
  [SupportedChainId.RINKEBY]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://rinkeby.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Rinkeby',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Rinkeby Ether', symbol: 'rETH', decimals: 18 },
    color: colorsDark.chain_4
  },
  [SupportedChainId.ROPSTEN]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://ropsten.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Ropsten',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Ropsten Ether', symbol: 'ropETH', decimals: 18 },
    color: colorsDark.chain_3
  },
  [SupportedChainId.KOVAN]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://kovan.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Kovan',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Kovan Ether', symbol: 'kovETH', decimals: 18 },
    color: colorsDark.chain_69
  },
  [SupportedChainId.GOERLI]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://goerli.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Görli',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Görli Ether', symbol: 'görETH', decimals: 18 },
    color: colorsDark.chain_5
  },
  [SupportedChainId.OPTIMISM]: {
    networkType: NetworkType.L2,
    blockWaitMsBeforeWarning: ms`25m`,
    bridge: 'https://app.optimism.io/bridge',
    defaultListUrl: OPTIMISM_LIST,
    docs: 'https://optimism.io/',
    explorer: 'https://optimistic.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/optimism/',
    label: 'Optimism',
    logoUrl: optimismLogoUrl,
    circleLogoUrl: optimismLogoUrl,
    statusPage: 'https://optimism.io/status',
    helpCenterUrl: 'https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    color: colorsDark.chain_10,
    backgroundColor: colorsDark.chain_10_background
  },
  [SupportedChainId.OPTIMISTIC_KOVAN]: {
    networkType: NetworkType.L2,
    blockWaitMsBeforeWarning: ms`25m`,
    bridge: 'https://app.optimism.io/bridge',
    defaultListUrl: OPTIMISM_LIST,
    docs: 'https://optimism.io/',
    explorer: 'https://optimistic.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/optimism/',
    label: 'Optimistic Kovan',
    logoUrl: optimismLogoUrl,
    statusPage: 'https://optimism.io/status',
    helpCenterUrl: 'https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ',
    nativeCurrency: { name: 'Optimistic Kovan Ether', symbol: 'kovOpETH', decimals: 18 },
    color: colorsDark.chain_69
  },
  [SupportedChainId.ARBITRUM_ONE]: {
    networkType: NetworkType.L2,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://bridge.arbitrum.io/',
    docs: 'https://offchainlabs.com/',
    explorer: 'https://arbiscan.io/',
    infoLink: 'https://info.uniswap.org/#/arbitrum',
    label: 'Arbitrum',
    logoUrl: arbitrumLogoUrl,
    circleLogoUrl: arbitrumCircleLogoUrl,
    defaultListUrl: ARBITRUM_LIST,
    helpCenterUrl: 'https://help.uniswap.org/en/collections/3137787-uniswap-on-arbitrum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    color: colorsDark.chain_42,
    backgroundColor: colorsDark.chain_42161_background
  },
  [SupportedChainId.ARBITRUM_RINKEBY]: {
    networkType: NetworkType.L2,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://bridge.arbitrum.io/',
    docs: 'https://offchainlabs.com/',
    explorer: 'https://rinkeby-explorer.arbitrum.io/',
    infoLink: 'https://info.uniswap.org/#/arbitrum/',
    label: 'Arbitrum Rinkeby',
    logoUrl: arbitrumLogoUrl,
    defaultListUrl: ARBITRUM_LIST,
    helpCenterUrl: 'https://help.uniswap.org/en/collections/3137787-uniswap-on-arbitrum',
    nativeCurrency: { name: 'Rinkeby Arbitrum Ether', symbol: 'rinkArbETH', decimals: 18 },
    color: colorsDark.chain_421611
  },
  [SupportedChainId.POLYGON]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://wallet.polygon.technology/bridge',
    docs: 'https://polygon.io/',
    explorer: 'https://polygonscan.com/',
    infoLink: 'https://info.uniswap.org/#/polygon/',
    label: 'Polygon',
    logoUrl: polygonMaticLogo,
    circleLogoUrl: polygonCircleLogoUrl,
    nativeCurrency: { name: 'Polygon Matic', symbol: 'MATIC', decimals: 18 },
    color: colorsDark.chain_137,
    backgroundColor: colorsDark.chain_137_background
  },
  [SupportedChainId.POLYGON_MUMBAI]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://wallet.polygon.technology/bridge',
    docs: 'https://polygon.io/',
    explorer: 'https://mumbai.polygonscan.com/',
    infoLink: 'https://info.uniswap.org/#/polygon/',
    label: 'Polygon Mumbai',
    logoUrl: polygonMaticLogo,
    nativeCurrency: { name: 'Polygon Mumbai Matic', symbol: 'mMATIC', decimals: 18 }
  },
  [SupportedChainId.CELO]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://www.portalbridge.com/#/transfer',
    docs: 'https://docs.celo.org/',
    explorer: 'https://celoscan.io/',
    infoLink: 'https://info.uniswap.org/#/celo',
    label: 'Celo',
    logoUrl: celoLogo,
    circleLogoUrl: celoCircleLogoUrl,
    nativeCurrency: { name: 'Celo', symbol: 'CELO', decimals: 18 },
    defaultListUrl: CELO_LIST
  },
  [SupportedChainId.CELO_ALFAJORES]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://www.portalbridge.com/#/transfer',
    docs: 'https://docs.celo.org/',
    explorer: 'https://alfajores-blockscout.celo-testnet.org/',
    infoLink: 'https://info.uniswap.org/#/celo',
    label: 'Celo Alfajores',
    logoUrl: celoLogo,
    nativeCurrency: { name: 'Celo', symbol: 'CELO', decimals: 18 },
    defaultListUrl: CELO_LIST
  },
  [SupportedChainId.BSC]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    docs: 'https://polygon.io/',
    explorer: 'https://bscscan.com/',
    infoLink: 'https://info.uniswap.org/#/polygon/',
    label: 'BSC',
    logoUrl: bscLogoUrl,
    circleLogoUrl: bscLogoUrl,
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    color: colorsDark.chain_137,
    backgroundColor: colorsDark.chain_137_background
  },
  [SupportedChainId.OKEXCHAIN]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    docs: 'https://polygon.io/',
    explorer: 'https://www.oklink.com/zh-cn/okc/',
    infoLink: 'https://info.uniswap.org/#/polygon/',
    label: 'OKXChain Mainnet',
    logoUrl: okxLogoUrl,
    circleLogoUrl: okxLogoUrl,
    nativeCurrency: { name: 'OKT', symbol: 'OKT', decimals: 18 },
    color: colorsDark.chain_137,
    backgroundColor: colorsDark.chain_137_background
  },
  [SupportedChainId.HUOBI]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    docs: 'https://polygon.io/',
    explorer: 'https://www.hecoinfo.com/',
    infoLink: 'https://info.uniswap.org/#/polygon/',
    label: 'Huobi ECO Chain Mainnet',
    logoUrl: huobiLogoUrl,
    circleLogoUrl: huobiLogoUrl,
    nativeCurrency: { name: 'HT', symbol: 'HT', decimals: 18 },
    color: colorsDark.chain_137,
    backgroundColor: colorsDark.chain_137_background
  },
  [SupportedChainId.GNOSIS]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    docs: 'https://polygon.io/',
    explorer: 'https://gnosisscan.io',
    infoLink: 'https://info.uniswap.org/#/polygon/',
    label: 'Gnosis',
    logoUrl: gnosisLogoUrl,
    circleLogoUrl: gnosisLogoUrl,
    nativeCurrency: { name: 'xDAI', symbol: 'xDAI', decimals: 18 },
    color: colorsDark.chain_137,
    backgroundColor: colorsDark.chain_137_background
  },
  [SupportedChainId.AVALANCHE]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    docs: 'https://polygon.io/',
    explorer: 'https://subnets.avax.network/',
    infoLink: 'https://info.uniswap.org/#/polygon/',
    label: 'Avalanche C-Chain',
    logoUrl: avalancheLogoUrl,
    circleLogoUrl: avalancheLogoUrl,
    nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
    color: colorsDark.chain_137,
    backgroundColor: colorsDark.chain_137_background
  },
  [SupportedChainId.FANTOM]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    docs: 'https://polygon.io/',
    explorer: 'https://ftmscan.com/',
    infoLink: 'https://info.uniswap.org/#/polygon/',
    label: 'Fantom Opera',
    logoUrl: fantomLogoUrl,
    circleLogoUrl: fantomLogoUrl,
    nativeCurrency: { name: 'FTM', symbol: 'FTM', decimals: 18 },
    color: colorsDark.chain_137,
    backgroundColor: colorsDark.chain_137_background
  },
  [SupportedChainId.KLAYTN]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    docs: 'https://polygon.io/',
    explorer: 'https://scope.klaytn.com/',
    infoLink: 'https://info.uniswap.org/#/polygon/',
    label: 'Klaytn Mainnet Cypress',
    logoUrl: klaytnLogoUrl,
    circleLogoUrl: klaytnLogoUrl,
    nativeCurrency: { name: 'KLAY', symbol: 'KLAY', decimals: 18 },
    color: colorsDark.chain_137,
    backgroundColor: colorsDark.chain_137_background
  },
  [SupportedChainId.AURORA]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    docs: 'https://polygon.io/',
    explorer: 'https://aurorascan.dev/',
    infoLink: 'https://info.uniswap.org/#/polygon/',
    label: 'Aurora Mainnet',
    logoUrl: auroraLogoUrl,
    circleLogoUrl: auroraLogoUrl,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    color: colorsDark.chain_137,
    backgroundColor: colorsDark.chain_137_background
  }
}

export function getChainInfo(chainId: SupportedL1ChainId): L1ChainInfo
export function getChainInfo(chainId: SupportedL2ChainId): L2ChainInfo
export function getChainInfo(chainId: SupportedChainId): L1ChainInfo | L2ChainInfo
export function getChainInfo(
  chainId: SupportedChainId | SupportedL1ChainId | SupportedL2ChainId | number | undefined
): L1ChainInfo | L2ChainInfo | undefined

/**
 * Overloaded method for returning ChainInfo given a chainID
 * Return type varies depending on input type:
 * number | undefined -> returns chaininfo | undefined
 * SupportedChainId -> returns L1ChainInfo | L2ChainInfo
 * SupportedL1ChainId -> returns L1ChainInfo
 * SupportedL2ChainId -> returns L2ChainInfo
 */
export function getChainInfo(chainId: any): any {
  if (chainId) {
    return CHAIN_INFO[chainId] ?? undefined
  }
  return undefined
}

export const MAINNET_INFO = CHAIN_INFO[SupportedChainId.MAINNET]
export function getChainInfoOrDefault(chainId: number | undefined) {
  return getChainInfo(chainId) ?? MAINNET_INFO
}
