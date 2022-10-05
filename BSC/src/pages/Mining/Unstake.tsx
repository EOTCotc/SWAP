import React, { useState, useContext, useMemo, useEffect, useCallback } from 'react'
import { ThemeContext } from 'styled-components'
import Header from './Header'
import { Text } from 'rebass'
import { useTokenBalance } from '../../state/wallet/hooks'
import { useActiveWeb3React } from '../../hooks'
import { tryParseAmount } from '../../state/swap/hooks'
import { Token } from 'eotc-bscswap-sdk'
import { BodyMining, Box, BoxSB, OrderCard } from './styleds'
import { ClickableText } from '../Pool/styleds'
import { AutoColumn } from '../../components/Column'
import { RowEnd } from '../../components/Row'
import { RadioCycle, RecordLink } from './index'
import { APY_LIST } from './index'
import { useGetStakeRecord } from './hook'
import { ButtonUnStake } from './ButtonUnStake'

export default function UnStake() {
  const theme = useContext(ThemeContext)
  const { account, chainId } = useActiveWeb3React()
  const [selectedDate, setSelectedDate] = useState(6)
  const [stakeRecord] = useGetStakeRecord()
  const [unstakeData, setUnstakeData] = useState([])
  const LPTOKEN_ADDRESS = '0x5f50c44637Dd639E4be73bE40c0D1fb0152398ac'
  const userPoolBalance = useTokenBalance(
    account ?? undefined,
    new Token(chainId as any, LPTOKEN_ADDRESS, 6, 'EOTC-V2', 'Eotcswap V2')
  )
  const [lpInput] = useState('')
  const MIN_STAKE = '1'
  const amount = tryParseAmount(lpInput, new Token(chainId as any, LPTOKEN_ADDRESS, 6, 'EOTC-V2', 'Eotcswap V2'))
  const buttonError = useMemo(() => {
    if (!amount) return '输入'
    if (userPoolBalance?.lessThan(amount)) return '余额不足'
    if (amount.lessThan(MIN_STAKE)) return `最低抵押${MIN_STAKE} LP`
    return ''
  }, [amount, userPoolBalance])
  console.log(buttonError)
  const handleStakeRecordData = useCallback(() => {
    setUnstakeData(stakeRecord.filter((item: any) => item.cycle == selectedDate && item.type === '2'))
  }, [selectedDate, stakeRecord])
  function delSetUnstakeData(id: string) {
    setUnstakeData(unstakeData.filter((item: any) => item.id !== id))
  }
  useEffect(() => {
    handleStakeRecordData()
  }, [handleStakeRecordData])

  return (
    <>
      <Header active={'unstake'} />
      <BodyMining>
        <RadioCycle selectedDate={selectedDate} setSelectedDate={setSelectedDate}></RadioCycle>
        <Box mt="33px">
          <BoxSB>
            <ClickableText fontWeight={400} fontSize={16} color={theme.text1}>
              质押LP (LP: {userPoolBalance ? userPoolBalance.toSignificant(4) : '-'})
            </ClickableText>
            <RecordLink></RecordLink>
          </BoxSB>
        </Box>

        {unstakeData.map((item: any) => (
          <Box key={item.id} mt="15px">
            <OrderCard>
              <BoxSB>
                <Text fontWeight={400} fontSize={14} color={theme.text7}>
                  订单编号: {item.id}
                </Text>
                <Text fontWeight={400} fontSize={14} color={theme.text8}>
                  {item.date}
                </Text>
              </BoxSB>
              <Box mt="20px">
                <RowEnd>
                  <AutoColumn style={{ width: '50%' }} gap="md">
                    <Text fontWeight={400} fontSize={14} color={theme.text8}>
                      质押数量
                    </Text>
                    <Text fontWeight={'bold'} fontSize={20} color={theme.text7}>
                      {item.num}
                    </Text>
                  </AutoColumn>
                  <AutoColumn style={{ width: '50%' }} gap="md">
                    <Text fontWeight={400} fontSize={14} color={theme.text8}>
                      预估收益
                    </Text>
                    <Text fontWeight={'bold'} fontSize={20} color={'#E6B37C'}>
                      + {item.num * APY_LIST[selectedDate]} EOTC
                    </Text>
                  </AutoColumn>
                </RowEnd>
              </Box>
              <Box mt="15px">
                <BoxSB>
                  {/* <ButtonLeft style={{ marginRight: '15px' }}>
                  <Text fontWeight={400} fontSize={16} color={'#237FF8'}>
                    继续质押
                  </Text>
                </ButtonLeft> */}
                  <ButtonUnStake id={item.id} delSetUnstakeData={delSetUnstakeData}>
                    赎回
                  </ButtonUnStake>
                </BoxSB>
              </Box>
            </OrderCard>
          </Box>
        ))}
      </BodyMining>
      {unstakeData.length === 0 && (
        <Box mt="15px">
          <BodyMining>
            <Text style={{ textAlign: 'center' }} fontWeight={400} fontSize={14} color={'#818DA8'}>
              没有数据
            </Text>
          </BodyMining>
        </Box>
      )}
      <Box mt="15px">
        <BodyMining>
          <Text fontWeight={400} fontSize={14} color={'#818DA8'}>
            由于代币精度问题，LP余额无法在部分钱包显示，不影响质押和赎回
          </Text>
        </BodyMining>
      </Box>
    </>
  )
}
