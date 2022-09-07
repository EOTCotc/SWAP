import React, { Fragment, useMemo } from 'react'
import styled from 'styled-components'
// import Refresh from '../../assets/images/refresh.svg'
// import querylogo from '../../assets/images/eotc.png'
import { useDerivedSwapInfo, useDexNameState } from '../../state/swap/hooks'
import PriceText from './PriceText'
import ExchangeButton from './ExchangeButton'
import { useUserSlippageTolerance } from '../../state/user/hooks'
import { CONTRACT } from '../../constants'
import { tradeBetterSort } from '../../data/V1'
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

const ListDiv = styled.div`
  display: flex;
  line-height: 25px;
`

const TokenBalance = styled.span`
  margin-left: 10px;
  font-size: 10px;
  color: #7586a7;
`

// interface CurrencyInquire {
//   currency?: Currency | null
//   arr?: Array<Text>
// }

export default function Inquire() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { v2TradeList, v2Trades } = useDerivedSwapInfo()
  // 用户允许的滑点
  const [allowedSlippage] = useUserSlippageTolerance()
  const { selectDexName, setDexName } = useDexNameState()
  const Trades = useMemo(() => tradeBetterSort(v2Trades), [v2Trades])

  return (
    <Lists>
      <ListTitle>
        <ActiveText>查询结果</ActiveText>
        {/* <ListImg src={Refresh}></ListImg> */}
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
                <ListDiv>
                  <ListImg src={CONTRACT[item.name].Icon}></ListImg>
                  <ActiveText> {item.name}</ActiveText>
                </ListDiv>
                <ListDiv>
                  <TokenBalance>
                    {item.pairs?.[0]?.reserve0.token.symbol}余额: {item.pairs?.[0]?.reserve0.toSignificant(2)}
                  </TokenBalance>
                  <TokenBalance>
                    {item.pairs?.[0]?.reserve1.token.symbol}余额: {item.pairs?.[0]?.reserve1.toSignificant(2)}
                  </TokenBalance>
                </ListDiv>
              </ListTitle>
              <ListTitle>
                <ListDiv>
                  <PriceText trade={item.trade} allowedSlippage={allowedSlippage} />
                </ListDiv>
                <ExchangeButton trade={item.trade} allowedSlippage={allowedSlippage} dexName={item.name} />
              </ListTitle>
            </QueryList>
          ) : (
            <Fragment key={item.name}></Fragment>
          )
        })
      ) : (
        <ListTitle>
          <ActiveText>输入查询</ActiveText>
          {/* <ListImg src={Refresh}></ListImg> */}
        </ListTitle>
      )}
    </Lists>
  )
}
