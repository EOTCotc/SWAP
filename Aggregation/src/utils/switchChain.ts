// import { networkConnection, walletConnectConnection } from '../connection'
import { getChainInfo } from '../constants/chainInfo'
import { isSupportedChain, SupportedChainId } from '../constants/chains'
import { FALLBACK_URLS, RPC_URLS } from '../constants/networks'

function getRpcUrl(chainId: SupportedChainId): string {
  switch (chainId) {
    case SupportedChainId.MAINNET:
    case SupportedChainId.RINKEBY:
    case SupportedChainId.ROPSTEN:
    case SupportedChainId.KOVAN:
    case SupportedChainId.GOERLI:
      return RPC_URLS[chainId][0]
    // Attempting to add a chain using an infura URL will not work, as the URL will be unreachable from the MetaMask background page.
    // MetaMask allows switching to any publicly reachable URL, but for novel chains, it will display a warning if it is not on the "Safe" list.
    // See the definition of FALLBACK_URLS for more details.
    default:
      return FALLBACK_URLS[chainId][0]
  }
}

export const switchChain = async (connector: any, chainId: SupportedChainId) => {
  if (!isSupportedChain(chainId)) {
    throw new Error(`Chain ${chainId} not supported for connector (${typeof connector})`)
  } else {
    const info = getChainInfo(chainId)
    const chainIdhex = '0x' + chainId.toString(16)
    const addChainParameter = {
      chainId: chainIdhex,
      chainName: info.label,
      rpcUrls: [getRpcUrl(chainId)],
      nativeCurrency: info.nativeCurrency,
      blockExplorerUrls: [info.explorer]
    }
    try {
    } catch (error) {}

    await connector
      .request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: chainIdhex
          } as any
        ]
      })
      .catch(async (error: { code: number }) => {
        console.error(error)
        if (error.code === 4902) {
          await connector.request({
            method: 'wallet_addEthereumChain',
            params: [{ ...addChainParameter }]
          })
        }

        throw error
      })
    if (connector.isTokenPocket) {
      window.location.reload()
    }
    // window.location.reload()
    // window.location.reload()
  }

  // await connector.activate(addChainParameter)
  // }
}
