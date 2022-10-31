import { Token } from 'eotc-bscswap-sdk'
import { useEffect, useState } from 'react'
import { CHAIN_IDS_TO_NAMES } from '../../constants/chains'
import { useActiveWeb3React } from '../../hooks'
import { getStakeRecord } from '../../services'
import { useTokenBalance } from '../../state/wallet/hooks'
import { LpTokenList } from '../../constants/lpTokenList'

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
export function useGetLpTokenBalance() {
  const { account, chainId } = useActiveWeb3React()
  const LPTOKEN_ADDRESS = LpTokenList[chainId as number]
  const LpTonke = new Token(chainId as number, LPTOKEN_ADDRESS, 12, 'EOTC-V2', 'Eotcswap V2')
  const userPoolBalance = useTokenBalance(account ?? undefined, LpTonke)
  return { LPTOKEN_ADDRESS, userPoolBalance, LpTonke }
}
