import React, { useState, useContext, useMemo, useCallback } from 'react'
import { RowBetween } from '../../components/Row'
import { ThemeContext } from 'styled-components'
import { ActionSheet, Toast } from 'react-vant'
import Header from './Header'
import { ClickableText } from '../Pool/styleds'
import { Text } from 'rebass'
import { ButtonPrimary } from '../../components/Button'
import { Input as NumericalInput } from '../../components/NumericalInput'
import { RadioCycle, RecordLink, APY_LIST } from './index'
import { useTokenBalance } from '../../state/wallet/hooks'
import { useActiveWeb3React } from '../../hooks'
import { tryParseAmount } from '../../state/swap/hooks'
import { Token } from 'eotc-bscswap-sdk'
import { BodyMining, Box, BoxSB, MaxButton, BoxInput } from './styleds'
import { stake as stakeApi } from '../../services'
import { useStakeCallback } from '../../hooks/useStakeCallback'
import { CHAIN_IDS_TO_NAMES } from '../../constants/chains'
export default function Stake() {
  const theme = useContext(ThemeContext)
  const { account, chainId } = useActiveWeb3React()
  const [selectedDate, setSelectedDate] = useState(6)
  const [visible, setVisible] = useState(false)
  const LPTOKEN_ADDRESS = '0x5f50c44637Dd639E4be73bE40c0D1fb0152398ac'
  const to = '0xdCAaB3E9Ade1000fd23Fa0EAcd2D7E1359300D8B'
  const userPoolBalance = useTokenBalance(
    account ?? undefined,
    new Token(chainId as any, LPTOKEN_ADDRESS, 6, 'EOTC-V2', 'Eotcswap V2')
  )

  const [lpInput, setLpInput] = useState('')
  const MIN_STAKE = '1'
  const amount = tryParseAmount(lpInput, new Token(chainId as any, LPTOKEN_ADDRESS, 6, 'EOTC-V2', 'Eotcswap V2'))
  const buttonError = useMemo(() => {
    if (!amount) return '输入'
    if (userPoolBalance?.lessThan(amount)) return '余额不足'
    if (amount.lessThan(MIN_STAKE)) return `最低抵押${MIN_STAKE} LP`
    return ''
  }, [amount, userPoolBalance])

  const actions: { name: string; value: string }[] = [
    { name: '100 LP', value: '100' },
    { name: '1000 LP', value: '1000' },
    { name: '5000 LP', value: '5000' },
    { name: '10000 LP', value: '10000' },
    { name: '50000 LP', value: '50000' }
  ]
  const { callback: stakeCallback, error: swapCallbackError } = useStakeCallback({
    amount,
    to,
    contractAddress: LPTOKEN_ADDRESS
  })
  const handleStake = useCallback(() => {
    if (!stakeCallback) return
    if (!amount) return
    if (!account) return
    stakeCallback()
      .then(async hash => {
        console.log(hash, 'hash')
        // console.log(hash.hash)
        await stakeApi({
          net: CHAIN_IDS_TO_NAMES[chainId as number], // 网络类型 bsc trx
          ads: account, // 钱包地址
          hx: hash, // 交易哈希
          num: amount.toExact(), // 交易数量,精度6位
          cycle: selectedDate + '' // 交易周期
        })
        console.log(swapCallbackError)
      })
      .catch(error => {
        console.log(error.message)
        Toast.fail(error.message)
      })
  }, [account, amount, chainId, selectedDate, stakeCallback, swapCallbackError])
  return (
    <>
      <Header active={'stake'} />
      <BodyMining>
        <RadioCycle selectedDate={selectedDate} setSelectedDate={setSelectedDate}></RadioCycle>
        <Box mt="20px">
          <RowBetween align="center">
            <BoxSB>
              <ClickableText fontWeight={400} fontSize={16} color={'#818DA8'}>
                年化收益率
              </ClickableText>
              <Text fontWeight={'bold'} style={{ marginLeft: '10px' }} color={'#E6B37C'}>
                {APY_LIST[selectedDate] * 100 + '%'}
              </Text>
            </BoxSB>
            <RecordLink></RecordLink>
          </RowBetween>
        </Box>
        <Box mt="33px">
          <BoxSB>
            <ClickableText fontWeight={400} fontSize={16} color={theme.text1}>
              质押LP (LP: {userPoolBalance ? userPoolBalance.toSignificant(4) : '-'})
            </ClickableText>
            <MaxButton
              onClick={() => {
                userPoolBalance && userPoolBalance.greaterThan(MIN_STAKE)
                  ? setLpInput(userPoolBalance.toExact() ?? '')
                  : Toast.fail({ message: `最低抵押${MIN_STAKE} LP` })
              }}
            >
              <Text fontWeight={'bold'} fontSize={14} color={'#7B7D8A'}>
                全部
              </Text>
            </MaxButton>
          </BoxSB>
        </Box>
        <Box mt="25px">
          <BoxInput>
            <RowBetween>
              <NumericalInput
                placeholder={`请输入最低${MIN_STAKE}LP`}
                value={lpInput}
                onUserInput={val => setLpInput(val)}
              />
              <Text
                onClick={() => {
                  setVisible(true)
                }}
                fontWeight={'bold'}
                fontSize={14}
                color={'#247FF7'}
              >
                选择区间
              </Text>
            </RowBetween>
          </BoxInput>
        </Box>
        <Box mt="20px">
          <ButtonPrimary
            onClick={() => {
              handleStake()
            }}
            disabled={Boolean(buttonError)}
          >
            {buttonError || '质押'}{' '}
          </ButtonPrimary>
        </Box>
        <ActionSheet
          title="质押区间"
          cancelText="取消"
          visible={visible}
          onCancel={() => setVisible(false)}
          onSelect={(action: any) => {
            setVisible(false)
            return setLpInput(action.value)
          }}
          actions={actions}
        />
      </BodyMining>
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
