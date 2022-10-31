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
import { Token } from '@eotcswap/swap-sdk'
import { fromHex } from 'tron-format-address'
import { BodyMining, Box, BoxSB, MaxButton, BoxInput } from './styleds'
import { stake as stakeApi } from '../../services'
import { useStakeCallback } from '../../hooks/useStakeCallback'
import { useTranslation } from 'react-i18next'
import { EOTCUSDTLPTOKEN } from '../../constants'

export default function Stake() {
  const theme = useContext(ThemeContext)
  const { t } = useTranslation()
  const { account, chainId } = useActiveWeb3React()
  const [selectedDate, setSelectedDate] = useState(6)
  const [visible, setVisible] = useState(false)
  const LPTOKEN_ADDRESS = EOTCUSDTLPTOKEN
  const to = 'TA6jfgkurdTrwqic3G56GpG2Keh5EWx2kq'
  const userPoolBalance = useTokenBalance(
    account ?? undefined,
    new Token(chainId as any, LPTOKEN_ADDRESS, 6, 'EOTC-V2', 'Eotcswap V2')
  )

  const [lpInput, setLpInput] = useState('')
  const MIN_STAKE = '100'
  const amount = tryParseAmount(lpInput, new Token(chainId as any, LPTOKEN_ADDRESS, 6, 'EOTC-V2', 'Eotcswap V2'))
  const buttonError = useMemo(() => {
    if (!amount) return t('input')
    if (userPoolBalance?.lessThan(amount)) return t('insufficientBalance')
    if (amount.lessThan(MIN_STAKE)) return t('text10', { amount: MIN_STAKE })
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
    contractAddress: fromHex(LPTOKEN_ADDRESS)
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
          net: 'trx', // 网络类型 bsc trx
          ads: fromHex(account), // 钱包地址
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
  }, [account, amount, selectedDate, stakeCallback, swapCallbackError])
  return (
    <>
      <Header active={'stake'} />
      <BodyMining>
        <RadioCycle selectedDate={selectedDate} setSelectedDate={setSelectedDate}></RadioCycle>
        <Box mt="20px">
          <RowBetween align="center">
            <BoxSB>
              <ClickableText fontWeight={400} fontSize={16} color={'#818DA8'}>
                {t('APY')}
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
              {t('stake')} LP (LP: {userPoolBalance ? userPoolBalance.toSignificant(4) : '-'})
            </ClickableText>
            <MaxButton
              onClick={() => {
                userPoolBalance && userPoolBalance.greaterThan(MIN_STAKE)
                  ? setLpInput(userPoolBalance.toExact() ?? '')
                  : Toast.fail({ message: t('text10', { amount: MIN_STAKE }) })
              }}
            >
              <Text fontWeight={'bold'} fontSize={14} color={'#7B7D8A'}>
                {t('max')}
              </Text>
            </MaxButton>
          </BoxSB>
        </Box>
        <Box mt="25px">
          <BoxInput>
            <RowBetween>
              <NumericalInput
                placeholder={t('text8', { amount: 100 })}
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
                {t('selectInterval')}
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
            {buttonError || t('stake')}{' '}
          </ButtonPrimary>
        </Box>
        <ActionSheet
          title={t('stakeInterval')}
          cancelText={t('cancel')}
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
            {t('text9')}
          </Text>
        </BodyMining>
      </Box>
    </>
  )
}
