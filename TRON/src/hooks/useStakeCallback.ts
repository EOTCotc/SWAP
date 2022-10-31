import { ethers } from 'ethers'
import { useMemo } from 'react'
import { useTransactionAdder } from '../state/transactions/hooks'
import { useTranslation } from 'react-i18next'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { transfer } = require('../utils/blockchain')
export function useStakeCallback({
  amount,
  to,
  contractAddress
}: {
  amount: any
  to: any
  contractAddress: any
}): {
  callback: null | (() => Promise<string>)
  error: string | null
} {
  const { t } = useTranslation()
  const addTransaction = useTransactionAdder()
  return useMemo(() => {
    return {
      callback: async function onStake(): Promise<string> {
        return transfer({
          amount: ethers.utils.parseUnits(amount.toExact(), 6),
          to,
          contractAddress
        })
          .then((response: any) => {
            console.log(response)
            response.hash = '0x' + response.txid
            const base = `质押 ${amount.toExact()} EOTC-USDT LP`

            addTransaction(response, {
              summary: base
            })

            return response.hash
          })
          .catch((error: any) => {
            // if the user rejected the tx, pass this along
            if (error?.code === 4001) {
              throw new Error(t('text20'))
            } else {
              console.log(error, 'error')
              console.error(`质押失败`, error, 'error')
              throw new Error(`质押失败: ${error.message}`)
            }
          })
      },
      error: null
    }
  }, [addTransaction, amount, contractAddress, to])
}
