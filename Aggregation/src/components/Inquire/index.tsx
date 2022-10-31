import React, { Fragment, useMemo } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
// import Refresh from '../../assets/images/refresh.svg'
// import querylogo from '../../assets/images/eotc.png'
import { useDerivedSwapInfo, useDexNameState } from '../../state/swap/hooks'
import PriceText from './PriceText'
import ExchangeButton from './ExchangeButton'
import { useExpertModeManager, useUserSlippageTolerance } from '../../state/user/hooks'
import { CONTRACTS } from '../../constants'
import { tradeBetterSort, filtrTrades } from '../../data/V1'
import { AutoRow } from '../Row'
import { LpHelper } from '../QuestionHelper'
import { isMobile } from 'react-device-detect'
import { useActiveWeb3React } from '../../hooks'
// import { AutoColumn } from '../Column'
const Lists = styled.div`
  padding: 1rem;
  border-radius: 30px;
  font-size: 18px;
  background: ${({ theme }) => theme.bg1};
  max-width: 600px;
  width: 100%;
  height: 100%;
`

const ListTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 10px;
`

const ListImg = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 6px;
  cursor: pointer;
`

const ActiveText = styled.div`
  color: ${({ theme }) => theme.text1};
`

const QueryList = styled.div`
  /* border: 1px solid #237ff8; */
  border-radius: 6px;
  margin: 10px 0px;
`

// const ListDiv = styled.div`
//   display: flex;
//   line-height: 25px;
// `

const TokenBalance = styled.span`
  margin-left: 10px;
  font-size: 10px;
  color: #7586a7;
`

export default function Inquire() {
  const { t } = useTranslation()
  const { v2TradeList, v2Trades } = useDerivedSwapInfo()
  // 用户允许的滑点
  const [allowedSlippage] = useUserSlippageTolerance()
  const { selectDexName, setDexName } = useDexNameState()
  const [isExpertMode] = useExpertModeManager()
  const { chainId } = useActiveWeb3React()
  const Trades = useMemo(() => {
    return !isExpertMode ? filtrTrades(tradeBetterSort(v2Trades)) : tradeBetterSort(v2Trades)
  }, [v2Trades, isExpertMode])

  return (
    <Lists>
      <ListTitle>
        <ActiveText>{t('searchResults')}</ActiveText>
      </ListTitle>

      {v2TradeList ? (
        Trades.map(item => {
          return item.trade ? (
            <QueryList
              key={item.name}
              style={selectDexName == item.name ? { border: '1px solid #237ff8' } : {}}
              onClick={() => {
                setDexName(item.name)
              }}
            >
              <ListTitle>
                <AutoRow gap="6px">
                  <ListImg src={CONTRACTS[chainId as any][item.name].Icon}></ListImg>
                  <ActiveText> {item.name}</ActiveText>
                </AutoRow>
                <AutoRow gap="6px" justify="flex-end">
                  {isMobile ? (
                    <LpHelper
                      text={
                        <>
                          <TokenBalance>
                            {item.pairs?.[0]?.reserve0.token.symbol}
                            {t('balance', { balanceInput: item.pairs?.[0]?.reserve0.toSignificant(2) })}{' '}
                          </TokenBalance>
                          <TokenBalance>
                            {item.pairs?.[0]?.reserve1.token.symbol}
                            {t('balance', { balanceInput: item.pairs?.[0]?.reserve1.toSignificant(2) })}
                          </TokenBalance>
                        </>
                      }
                    />
                  ) : (
                    <>
                      <TokenBalance>
                        {item.pairs?.[0]?.reserve0.token.symbol}{' '}
                        {t('balance', { balanceInput: item.pairs?.[0]?.reserve0.toSignificant(2) })}{' '}
                      </TokenBalance>
                      <TokenBalance>
                        {item.pairs?.[0]?.reserve1.token.symbol}
                        {t('balance', { balanceInput: item.pairs?.[0]?.reserve1.toSignificant(2) })}{' '}
                      </TokenBalance>
                    </>
                  )}
                </AutoRow>
              </ListTitle>
              <ListTitle>
                <AutoRow gap="6px">
                  <PriceText trade={item.trade} allowedSlippage={allowedSlippage} />
                </AutoRow>
                <ExchangeButton trade={item.trade} allowedSlippage={allowedSlippage} dexName={item.name} />
              </ListTitle>
            </QueryList>
          ) : (
            <Fragment key={item.name}></Fragment>
          )
        })
      ) : (
        <ListTitle>
          <ActiveText>{t('enterAquery')}</ActiveText>
          {/* <ListImg src={Refresh}></ListImg> */}
        </ListTitle>
      )}
    </Lists>
  )
}
