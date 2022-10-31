import { SupportedChainId } from './chains'

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY
if (typeof INFURA_KEY === 'undefined') {
  throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`)
}

/**
 * Fallback JSON-RPC endpoints.
 * These are used if the integrator does not provide an endpoint, or if the endpoint does not work.
 *
 * MetaMask allows switching to any URL, but displays a warning if it is not on the "Safe" list:
 * https://github.com/MetaMask/metamask-mobile/blob/bdb7f37c90e4fc923881a07fca38d4e77c73a579/app/core/RPCMethods/wallet_addEthereumChain.js#L228-L235
 * https://chainid.network/chains.json
 *
 * These "Safe" URLs are listed first, followed by other fallback URLs, which are taken from chainlist.org.
 */
export const FALLBACK_URLS: { [key in SupportedChainId]: string[] } = {
  [SupportedChainId.MAINNET]: [
    // "Safe" URLs
    'https://api.mycryptoapi.com/eth',
    'https://cloudflare-eth.com',
    // "Fallback" URLs
    'https://rpc.ankr.com/eth',
    'https://eth-mainnet.public.blastapi.io'
  ],
  [SupportedChainId.BSC]: [
    // "Safe" URLs
    'https://bsc-dataseed1.ninicoin.io',
    'https://bsc-dataseed.binance.org/',
    'https://bsc-dataseed1.defibit.io/',
    'https://bsc-dataseed2.defibit.io/',
    'https://bsc-dataseed3.defibit.io/',
    'https://bsc-dataseed4.defibit.io/',
    'https://bsc-dataseed2.ninicoin.io/',
    'https://bsc-dataseed3.ninicoin.io/',
    'https://bsc-dataseed4.ninicoin.io/',
    'https://bsc-dataseed1.binance.org/',
    'https://bsc-dataseed2.binance.org/'
    // "Fallback" URLs
  ],
  [SupportedChainId.OKEXCHAIN]: [
    // "Safe" URLs
    'https://exchainrpc.okex.org'
    // "Fallback" URLs
  ],
  [SupportedChainId.ROPSTEN]: [
    // "Fallback" URLs
    'https://rpc.ankr.com/eth_ropsten'
  ],
  [SupportedChainId.RINKEBY]: [
    // "Fallback" URLs
    'https://rinkeby-light.eth.linkpool.io/'
  ],
  [SupportedChainId.GOERLI]: [
    // "Safe" URLs
    'https://rpc.goerli.mudit.blog/',
    // "Fallback" URLs
    'https://rpc.ankr.com/eth_goerli'
  ],
  [SupportedChainId.KOVAN]: [
    // "Safe" URLs
    'https://kovan.poa.network',
    // "Fallback" URLs
    'https://eth-kovan.public.blastapi.io'
  ],
  [SupportedChainId.POLYGON]: [
    // "Safe" URLs
    'https://polygon-rpc.com/',
    'https://rpc-mainnet.matic.network',
    'https://matic-mainnet.chainstacklabs.com',
    'https://rpc-mainnet.maticvigil.com',
    'https://rpc-mainnet.matic.quiknode.pro',
    'https://matic-mainnet-full-rpc.bwarelabs.com'
  ],
  [SupportedChainId.POLYGON_MUMBAI]: [
    // "Safe" URLs
    'https://matic-mumbai.chainstacklabs.com',
    'https://rpc-mumbai.maticvigil.com',
    'https://matic-testnet-archive-rpc.bwarelabs.com'
  ],
  [SupportedChainId.ARBITRUM_ONE]: [
    // "Safe" URLs
    'https://arb1.arbitrum.io/rpc',
    // "Fallback" URLs
    'https://arbitrum.public-rpc.com'
  ],
  [SupportedChainId.ARBITRUM_RINKEBY]: [
    // "Safe" URLs
    'https://rinkeby.arbitrum.io/rpc'
  ],
  [SupportedChainId.OPTIMISM]: [
    // "Safe" URLs
    'https://mainnet.optimism.io/',
    // "Fallback" URLs
    'https://rpc.ankr.com/optimism'
  ],
  [SupportedChainId.OPTIMISTIC_KOVAN]: [
    // "Safe" URLs
    'https://kovan.optimism.io'
  ],
  [SupportedChainId.CELO]: [
    // "Safe" URLs
    `https://forno.celo.org`
  ],
  [SupportedChainId.CELO_ALFAJORES]: [
    // "Safe" URLs
    `https://alfajores-forno.celo-testnet.org`
  ],
  [SupportedChainId.HUOBI]: [
    'https://http-mainnet-node.huobichain.com',
    'https://http-mainnet.hecochain.com',
    'https://pub001.hg.network/rpc',
    'https://hecoapi.terminet.io/rpc'
  ],
  [SupportedChainId.GNOSIS]: [
    'https://rpc.gnosischain.com',
    'https://xdai-rpc.gateway.pokt.network',
    'https://xdai-archive.blockscout.com',
    'https://gnosis-mainnet.public.blastapi.io',
    'https://rpc.ankr.com/gnosis',
    'https://rpc.ap-southeast-1.gateway.fm/v1/gnosis/non-archival/mainnet'
  ],
  [SupportedChainId.AVALANCHE]: [
    'https://api.avax.network/ext/bc/C/rpc',
    'https://rpc.ankr.com/avalanche',
    'https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc',
    'https://avalancheapi.terminet.io/ext/bc/C/rpc',
    'https://1rpc.io/avax/c'
  ],
  [SupportedChainId.FANTOM]: [
    'https://fantom-mainnet.gateway.pokt.network/v1/lb/62759259ea1b320039c9e7ac',
    'https://rpc.ftm.tools/',
    'https://rpc.ankr.com/fantom',
    'https://rpc.fantom.network',
    'https://rpc2.fantom.network',
    'https://rpc3.fantom.network',
    'https://rpcapi.fantom.network',
    'https://fantom-mainnet.public.blastapi.io'
  ],
  [SupportedChainId.KLAYTN]: [
    'https://public-node-api.klaytnapi.com/v1/cypress',
    'https://klaytn01.fandom.finance',
    'https://klaytn02.fandom.finance',
    'https://klaytn03.fandom.finance',
    'https://klaytn04.fandom.finance',
    'https://klaytn05.fandom.finance',
    'https://cypress.fandom.finance/archive'
  ],
  [SupportedChainId.AURORA]: ['https://mainnet.aurora.dev']
}

/**
 * Known JSON-RPC endpoints.
 * These are the URLs used by the interface when there is not another available source of chain data.
 */
export const RPC_URLS: { [key in SupportedChainId]: string[] } = {
  [SupportedChainId.MAINNET]: [...FALLBACK_URLS[SupportedChainId.MAINNET]],
  [SupportedChainId.RINKEBY]: [...FALLBACK_URLS[SupportedChainId.RINKEBY]],
  [SupportedChainId.ROPSTEN]: [...FALLBACK_URLS[SupportedChainId.ROPSTEN]],
  [SupportedChainId.GOERLI]: [...FALLBACK_URLS[SupportedChainId.GOERLI]],
  [SupportedChainId.KOVAN]: [...FALLBACK_URLS[SupportedChainId.KOVAN]],
  [SupportedChainId.OPTIMISM]: [...FALLBACK_URLS[SupportedChainId.OPTIMISM]],
  [SupportedChainId.OPTIMISTIC_KOVAN]: [...FALLBACK_URLS[SupportedChainId.OPTIMISTIC_KOVAN]],
  [SupportedChainId.ARBITRUM_ONE]: [...FALLBACK_URLS[SupportedChainId.ARBITRUM_ONE]],
  [SupportedChainId.ARBITRUM_RINKEBY]: [...FALLBACK_URLS[SupportedChainId.ARBITRUM_RINKEBY]],
  [SupportedChainId.POLYGON]: [...FALLBACK_URLS[SupportedChainId.POLYGON]],
  [SupportedChainId.POLYGON_MUMBAI]: [...FALLBACK_URLS[SupportedChainId.POLYGON_MUMBAI]],
  [SupportedChainId.CELO]: FALLBACK_URLS[SupportedChainId.CELO],
  [SupportedChainId.CELO_ALFAJORES]: FALLBACK_URLS[SupportedChainId.CELO_ALFAJORES],
  [SupportedChainId.BSC]: FALLBACK_URLS[SupportedChainId.BSC],
  [SupportedChainId.OKEXCHAIN]: FALLBACK_URLS[SupportedChainId.OKEXCHAIN],
  [SupportedChainId.HUOBI]: FALLBACK_URLS[SupportedChainId.HUOBI],
  [SupportedChainId.GNOSIS]: FALLBACK_URLS[SupportedChainId.GNOSIS],
  [SupportedChainId.AVALANCHE]: FALLBACK_URLS[SupportedChainId.AVALANCHE],
  [SupportedChainId.FANTOM]: FALLBACK_URLS[SupportedChainId.FANTOM],
  [SupportedChainId.KLAYTN]: FALLBACK_URLS[SupportedChainId.KLAYTN],
  [SupportedChainId.AURORA]: FALLBACK_URLS[SupportedChainId.AURORA]
}
