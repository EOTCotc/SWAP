import React, { useState } from 'react'
import { ButtonUnStake as _ButtonUnStake } from './styleds'
import { unstake } from '../../services'
import { useActiveWeb3React } from '../../hooks'
import Loader from '../../components/Loader'
import { Toast } from 'react-vant'
export function ButtonUnStake({
  id,
  delSetUnstakeData,
  children
}: {
  id: string
  delSetUnstakeData: any
  children?: React.ReactNode
}) {
  const [loading, setLoading] = useState(false)
  const { account } = useActiveWeb3React()
  function handleUnStake() {
    setLoading(true)
    unstake({ id, ads: account as string }).then((response: any) => {
      if (response?.Code === '1') {
        Toast.success('赎回确认中...')
        delSetUnstakeData(id)
      } else {
        Toast.fail('赎回失败')
      }
      setLoading(false)
    })
  }
  return (
    <_ButtonUnStake
      onClick={() => {
        handleUnStake()
      }}
    >
      {children}
      {loading && <Loader stroke="white" />}
    </_ButtonUnStake>
  )
}
