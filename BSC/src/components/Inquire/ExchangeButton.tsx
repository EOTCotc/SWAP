import React, { useCallback, useState } from 'react'
import ReactGA from 'react-ga'
import { useActiveWeb3React } from '../../hooks'
import useWrapCallback, { WrapType } from '../../hooks/useWrapCallback'
import { Field } from '../../state/swap/actions'
import { useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from '../../state/swap/hooks'
// import { SwapCallbackError } from '../swap/styleds'

import {
  ButtonErrorExchang,
  ButtonLight,
  ButtonPrimary,
  ButtonConfirmedExchange,
  ButtonWallet
} from '../../components/Button'
import { GreyCard } from '../Card'
import { TYPE } from '../../theme'
import { ApprovalState, useApproveCallbackFromTrade } from '../../hooks/useApproveCallback'
import { JSBI, Trade } from 'eotc-bscswap-sdk'
import { computeTradePriceBreakdown, warningSeverity } from '../../utils/prices'
import { useExpertModeManager, useUserDeadline } from '../../state/user/hooks'
import { RowBetween } from '../Row'
import Loader from '../Loader'
import { Text } from 'rebass'
import ProgressSteps from '../ProgressSteps'
import { useSwapCallback } from '../../hooks/useSwapCallback'
import confirmPriceImpactWithoutFee from '../swap/confirmPriceImpactWithoutFee'
import useENSAddress from '../../hooks/useENSAddress'
import { getTradeVersion } from '../../data/V1'
import Wallet from '../../assets/images/wallet.png'
import { useWalletModalToggle } from '../../state/application/hooks'
import ConfirmSwapModal from '../swap/ConfirmSwapModal'
import styled from 'styled-components'
const LoadingButton = styled.div`
  /* display: flex; */
  justify-content: center;
  align-items: center;
`
export default function ExchangeButton({
  trade,
  allowedSlippage,
  dexName
}: {
  trade: Trade
  allowedSlippage: number
  dexName: string
}) {
  const { account } = useActiveWeb3React()
  const { independentField, typedValue, recipient } = useSwapState()
  const { parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo()
  const { wrapType, execute: onWrap, inputError: wrapInputError } = useWrapCallback(
    currencies[Field.INPUT],
    currencies[Field.OUTPUT],
    typedValue
  )

  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const parsedAmounts = showWrap
    ? {
        [Field.INPUT]: parsedAmount,
        [Field.OUTPUT]: parsedAmount
      }
    : {
        [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
        [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount
      }
  const route = trade?.route
  //user是否指定输入输出
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0))
  )
  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)
  // 滑点 警告
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)
  // check whether the user has approved the router on the input token
  //检查用户是否已经批准了路由器的输入令牌
  const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage, dexName)
  const [approvalSubmitted] = useState<boolean>(false)
  // 是否专家模式
  const [isExpertMode] = useExpertModeManager()
  // 在非专家模式中，永远不要显示价格影响是否高于阈值
  const showApproveFlow =
    !swapInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)
  const noRoute = !route
  const isValid = !swapInputError
  // get custom setting values for user
  // 获取用户的自定义设置值
  const [deadline] = useUserDeadline()
  // the callback to execute the swap
  //交换的回调
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(
    trade,
    allowedSlippage,
    deadline,
    recipient,
    dexName
  )
  // toggle wallet when disconnected
  const toggleWalletModal = useWalletModalToggle()

  // console.log(selectDexName, 'selectDexName')
  // setDexName('EOTC')
  // modal and loading
  const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    showConfirm: boolean
    tradeToConfirm: Trade | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    showConfirm: false,
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined
  })
  const { onUserInput } = useSwapActionHandlers()
  const { address: recipientAddress } = useENSAddress(recipient)
  const handleSwap = useCallback(() => {
    if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee)) {
      return
    }
    if (!swapCallback) {
      return
    }
    setSwapState({ attemptingTxn: true, tradeToConfirm, showConfirm, swapErrorMessage: undefined, txHash: undefined })
    swapCallback()
      .then(hash => {
        setSwapState({ attemptingTxn: false, tradeToConfirm, showConfirm, swapErrorMessage: undefined, txHash: hash })
        ReactGA.event({
          category: 'Swap',
          action:
            recipient === null
              ? 'Swap w/o Send'
              : (recipientAddress ?? recipient) === account
              ? 'Swap w/o Send + recipient'
              : 'Swap w/ Send',
          label: [
            trade?.inputAmount?.currency?.symbol,
            trade?.outputAmount?.currency?.symbol,
            getTradeVersion(trade)
          ].join('/')
        })
      })
      .catch(error => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          showConfirm,
          swapErrorMessage: error.message,
          txHash: undefined
        })
      })
  }, [tradeToConfirm, account, priceImpactWithoutFee, recipient, recipientAddress, showConfirm, swapCallback, trade])
  const handleAcceptChanges = useCallback(() => {
    setSwapState({ tradeToConfirm: trade, swapErrorMessage, txHash, attemptingTxn, showConfirm })
  }, [attemptingTxn, showConfirm, swapErrorMessage, trade, txHash])
  const handleConfirmDismiss = useCallback(() => {
    setSwapState({ showConfirm: false, tradeToConfirm, attemptingTxn, swapErrorMessage, txHash })
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash])
  return (
    <>
      <ConfirmSwapModal
        isOpen={showConfirm}
        trade={trade}
        originalTrade={tradeToConfirm}
        onAcceptChanges={handleAcceptChanges}
        attemptingTxn={attemptingTxn}
        txHash={txHash}
        recipient={recipient}
        allowedSlippage={allowedSlippage}
        onConfirm={handleSwap}
        swapErrorMessage={swapErrorMessage}
        onDismiss={handleConfirmDismiss}
      />
      <div>
        {!account ? (
          <>
            <ButtonLight onClick={toggleWalletModal}>
              <ButtonWallet src={Wallet} />
              连接钱包
            </ButtonLight>
          </>
        ) : showWrap ? (
          <ButtonPrimary disabled={Boolean(wrapInputError)} onClick={onWrap}>
            {wrapInputError ?? (wrapType === WrapType.WRAP ? 'Wrap' : wrapType === WrapType.UNWRAP ? 'Unwrap' : null)}
          </ButtonPrimary>
        ) : noRoute && userHasSpecifiedInputOutput ? (
          <GreyCard style={{ textAlign: 'center' }}>
            <TYPE.main mb="4px">该交易的流动性不足。</TYPE.main>
          </GreyCard>
        ) : showApproveFlow ? (
          <RowBetween>
            <ButtonConfirmedExchange
              onClick={approveCallback}
              disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
              width="48%"
              altDisabledStyle={approval === ApprovalState.PENDING} // show solid button while waiting
              confirmed={approval === ApprovalState.APPROVED}
            >
              <Text fontSize={16} fontWeight={500}>
                {approval === ApprovalState.PENDING ? (
                  <LoadingButton>
                    授权 <Loader stroke="white" />
                  </LoadingButton>
                ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
                  '合法的'
                ) : (
                  '授权 '
                )}
              </Text>
            </ButtonConfirmedExchange>
            <ButtonErrorExchang
              onClick={() => {
                if (isExpertMode) {
                  handleSwap()
                } else {
                  setSwapState({
                    tradeToConfirm: trade,
                    attemptingTxn: false,
                    swapErrorMessage: undefined,
                    showConfirm: true,
                    txHash: undefined
                  })
                }
              }}
              width="48%"
              id="swap-button"
              disabled={!isValid || approval !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode)}
              error={isValid && priceImpactSeverity > 2}
            >
              <Text fontSize={16} fontWeight={500}>
                {priceImpactSeverity > 3 && !isExpertMode
                  ? `价格影响高`
                  : `${priceImpactSeverity > 2 ? ' 仍要' : ''}兑换`}
              </Text>
            </ButtonErrorExchang>
          </RowBetween>
        ) : (
          <ButtonErrorExchang
            onClick={() => {
              if (isExpertMode) {
                handleSwap()
              } else {
                setSwapState({
                  tradeToConfirm: trade,
                  attemptingTxn: false,
                  swapErrorMessage: undefined,
                  showConfirm: true,
                  txHash: undefined
                })
              }
            }}
            id="swap-button"
            disabled={!isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError}
            error={isValid && priceImpactSeverity > 2 && !swapCallbackError}
          >
            <Text fontSize={16} fontWeight={500}>
              {swapInputError
                ? swapInputError
                : priceImpactSeverity > 3 && !isExpertMode
                ? `价格影响太高`
                : `${priceImpactSeverity > 2 ? ' 仍要' : ''}兑换`}
            </Text>
          </ButtonErrorExchang>
        )}
        {showApproveFlow && <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />}
        {/* {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null} */}
        {/* {betterTradeLinkVersion && <BetterTradeLink version={betterTradeLinkVersion} />} */}
      </div>
    </>
  )
}
