// import { useWeb3React } from '@web3-react/core'
// import { getConnection } from '../connection/utils'
import { SupportedChainId } from '../constants/chains'
import { useCallback } from 'react'
import { addPopup } from '../state/applicationv3/reducer'
import { updateConnectionError } from '../state/connection/reducer'
import { useAppDispatch } from '../state/hooks'
import { switchChain } from '../utils/switchChain'
import { useActiveWeb3React } from '../hooks'
// import { Connector } from '@web3-react/types'
export default function useSelectChain() {
  const dispatch = useAppDispatch()
  // const { connector } = useWeb3React()
  const { library: provider } = useActiveWeb3React()

  return useCallback(
    async (targetChain: SupportedChainId) => {
      console.log('targetChain', targetChain)
      // if (!connector) return
      // const connectionType = getConnection(connector)?.type

      // const connectionType = ''
      const connectionType: any = 'INJECTED'
      try {
        // dispatch(updateConnectionError({ connectionType, error: undefined }))
        await switchChain(provider?.provider as any, targetChain)
      } catch (error) {
        console.error('Failed to switch networks', error)
        if (error instanceof Error) {
          dispatch(updateConnectionError({ connectionType, error: error.message }))
        }

        dispatch(addPopup({ content: { failedSwitchNetwork: targetChain }, key: `failed-network-switch` }))
      }
    },
    [dispatch, provider?.provider]
  )
}
