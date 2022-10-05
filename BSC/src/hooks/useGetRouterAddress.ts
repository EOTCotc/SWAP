import { useActiveWeb3React } from '.'
import { CONTRACTS } from '../constants'
export function useGetRouterAddress() {
  const { chainId } = useActiveWeb3React()
  return CONTRACTS[chainId as any]['EOTC'].ROUTER
}
