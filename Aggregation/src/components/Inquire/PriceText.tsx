import { Trade } from 'eotc-bscswap-sdk'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { computeTradePriceBreakdown } from '../../utils/prices'
const QueryText = styled.span`
  color: ${({ theme }) => theme.text1};
  font-size: 18px;
  font-weight: 500;
  white-space: nowrap;
`
const TokenBalance = styled.span`
  margin-left: 10px;
  font-size: 10px;
  color: #7586a7;
`

export default function PriceText({ trade }: { trade: Trade; allowedSlippage: number }) {
  // const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage)
  const { realizedLPFee } = computeTradePriceBreakdown(trade)
  const { t } = useTranslation()
  return (
    <>
      <QueryText>{trade.outputAmount.toSignificant(4) + ' ' + trade.outputAmount.currency.symbol}</QueryText>
      <TokenBalance>
        ({t('fees')}：{realizedLPFee ? `${realizedLPFee.toSignificant(3)} ${trade.inputAmount.currency.symbol}` : '-'})
      </TokenBalance>
    </>
  )
}
