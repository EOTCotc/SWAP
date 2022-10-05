import { useEffect, useState } from 'react'
import { CHAIN_IDS_TO_NAMES } from '../../constants/chains'
import { useActiveWeb3React } from '../../hooks'
import { getStakeRecord } from '../../services'

// import { useTransactionAdder } from '../../state/transactions/hooks'

export function useGetStakeRecord() {
  const [stakeRecord, setStakeRecord] = useState([] as any)
  const [loadng, setLoading] = useState(true)
  const [update, setUpdate] = useState(false)
  const { account, chainId } = useActiveWeb3React()
  useEffect(() => {
    async function handleStakeRecord() {
      const result = await getStakeRecord({ net: CHAIN_IDS_TO_NAMES[chainId as number], ads: account as string })
      setStakeRecord(result)
      setLoading(false)
    }
    account && handleStakeRecord()
  }, [account, chainId, update])
  return [stakeRecord, setStakeRecord, loadng, setUpdate]
}
// export function useUnstake({ id, ads }: { id: string; ads: string }) {
//   const [loadng, setLoading] = useState(false)
//   unstake({ id, ads }).then()
// }
// export function useUnstakeCallback({
//   id,
//   ads,
//   amount
// }: {
//   id: string
//   ads: string
//   amount?: string
// }): {
//   callback: null | (() => Promise<string>)
//   error: string | null
// } {
//   // const addTransaction = useTransactionAdder()
//   return useMemo(() => {
//     return {
//       callback: async function onUnstake(): Promise<string> {
//         return unstake({
//           id,
//           ads
//         })
//           .then((response: any) => {
//             console.log(response, 'response')
//             console.log(amount, 'amount')
//             // response.hash = '0x' + response.txid
//             // const base = `赎回 ${amount} EOTC-USDT LP`

//             // addTransaction(response, {
//             //   summary: base
//             // })

//             return response.hash
//           })
//           .catch((error: any) => {
//             // if the user rejected the tx, pass this along
//             if (error?.code === 4001) {
//               throw new Error('交易被拒绝')
//             } else {
//               console.log(error, 'error')
//               console.error(`质押失败`, error, 'error')
//               throw new Error(`质押失败: ${error.message}`)
//             }
//           })
//       },
//       error: null
//     }
//   }, [ads, amount, id])
// }
