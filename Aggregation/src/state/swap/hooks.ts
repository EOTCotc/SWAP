import useENS from '../../hooks/useENS'
import { Version } from '../../hooks/useToggledVersion'
import { parseUnits } from '@ethersproject/units'
import { Currency, CurrencyAmount, ETHER, JSBI, Pair, Token, TokenAmount, Trade } from 'eotc-bscswap-sdk'
import { ParsedQs } from 'qs'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useV1Trade } from '../../data/V1'
import { useActiveWeb3React } from '../../hooks'
import { useCurrency } from '../../hooks/Tokens'
import { useTradeExactIn, useTradeExactOut, TradeList } from '../../hooks/Trades'
import useParsedQueryString from '../../hooks/useParsedQueryString'
import { isAddress } from '../../utils'
import { AppDispatch, AppState } from '../index'
import { useCurrencyBalances } from '../wallet/hooks'
import {
  Field,
  replaceSwapState,
  selectCurrency,
  setDexName,
  setRecipient,
  switchCurrencies,
  typeInput
} from './actions'
import { SwapState } from './reducer'
import useToggledVersion from '../../hooks/useToggledVersion'
import { useUserSlippageTolerance } from '../user/hooks'
import { computeSlippageAdjustedAmounts } from '../../utils/prices'
import { Trades } from '../../constants'

export function useSwapState(): AppState['swap'] {
  return useSelector<AppState, AppState['swap']>(state => state.swap)
}
export function useDexNameState() {
  const dispatch = useDispatch<AppDispatch>()
  const onDexNameSelection = useCallback(
    dexName => {
      return dispatch(setDexName({ dexName }))
    },
    [dispatch]
  )
  return {
    selectDexName: useSelector<AppState, AppState['dexNameState']>(state => state.dexNameState).dexName,
    setDexName: onDexNameSelection
  }
}

export function useSwapActionHandlers(): {
  onCurrencySelection: (field: Field, currency: Currency) => void
  onSwitchTokens: () => void
  onUserInput: (field: Field, typedValue: string) => void
  onChangeRecipient: (recipient: string | null) => void
} {
  const dispatch = useDispatch<AppDispatch>()
  const onCurrencySelection = useCallback(
    (field: Field, currency: Currency) => {
      dispatch(
        selectCurrency({
          field,
          // currencyId: currency instanceof Token ? currency.address : currency === ETHER ? 'BNB' : ''
          currencyId: currency instanceof Token ? currency.address : currency === ETHER ? 'ETH' : ''
        })
      )
    },
    [dispatch]
  )

  const onSwitchTokens = useCallback(() => {
    dispatch(switchCurrencies())
  }, [dispatch])

  const onUserInput = useCallback(
    (field: Field, typedValue: string) => {
      dispatch(typeInput({ field, typedValue }))
    },
    [dispatch]
  )

  const onChangeRecipient = useCallback(
    (recipient: string | null) => {
      dispatch(setRecipient({ recipient }))
    },
    [dispatch]
  )

  return {
    onSwitchTokens,
    onCurrencySelection,
    onUserInput,
    onChangeRecipient
  }
}

// try to parse a user entered amount for a given token
export function tryParseAmount(value?: string, currency?: Currency): CurrencyAmount | undefined {
  if (!value || !currency) {
    return undefined
  }
  try {
    const typedValueParsed = parseUnits(value, currency.decimals).toString()
    if (typedValueParsed !== '0') {
      return currency instanceof Token
        ? new TokenAmount(currency, JSBI.BigInt(typedValueParsed))
        : CurrencyAmount.ether(JSBI.BigInt(typedValueParsed))
    }
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug(`Failed to parse input amount: "${value}"`, error)
  }
  // necessary for all paths to return a value
  return undefined
}

const BAD_RECIPIENT_ADDRESSES: string[] = [
  '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f', // v2 factory
  '0xf164fC0Ec4E93095b804a4795bBe1e041497b92a', // v2 router 01
  '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D' // v2 router 02
]

/**
 * Returns true if any of the pairs or tokens in a trade have the given checksummed address
 * @param trade to check for the given address
 * @param checksummedAddress address to check in the pairs and tokens
 */
function involvesAddress(trade: Trade, checksummedAddress: string): boolean {
  return (
    trade.route.path.some(token => token.address === checksummedAddress) ||
    trade.route.pairs.some(pair => pair.liquidityToken.address === checksummedAddress)
  )
}

// from the current swap inputs, compute the best trade and return it.
// 从当前的交换输入，计算出最好的交易并返回
export function useDerivedSwapInfo(): {
  currencies: { [field in Field]?: Currency }
  currencyBalances: { [field in Field]?: CurrencyAmount }
  parsedAmount: CurrencyAmount | undefined
  v2Trade: Trade | undefined
  inputError?: string
  v1Trade: Trade | undefined
  v2TradeList: TradeList | null
  allowedPairs: {
    [key: string]: [Pair | null]
  }
  v2Trades: Trades
} {
  const { account } = useActiveWeb3React()

  const toggledVersion = useToggledVersion()

  const {
    independentField,
    typedValue,
    [Field.INPUT]: { currencyId: inputCurrencyId }, //输入address
    [Field.OUTPUT]: { currencyId: outputCurrencyId }, //输出address
    recipient //接收地址
  } = useSwapState()

  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)
  const recipientLookup = useENS(recipient ?? undefined)
  const to: string | null = (recipient === null ? account : recipientLookup.address) ?? null

  const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [
    inputCurrency ?? undefined,
    outputCurrency ?? undefined
  ])
  // 精确输入 independentField === 'INPUT"
  const isExactIn: boolean = independentField === Field.INPUT
  const parsedAmount = tryParseAmount(typedValue, (isExactIn ? inputCurrency : outputCurrency) ?? undefined)
  const { TradeList: bestTradeExactInObj, allowedPairs: ExactInAllowedPairs, Trades: exactInTrades } = useTradeExactIn(
    isExactIn ? parsedAmount : undefined,
    outputCurrency ?? undefined
  )
  const {
    TradeList: bestTradeExactOutObj,
    allowedPairs: ExactOutAllowedPairs,
    Trades: exactOutTrades
  } = useTradeExactOut(inputCurrency ?? undefined, !isExactIn ? parsedAmount : undefined)
  const bestTradeExactIn = bestTradeExactInObj?.EOTC
  const bestTradeExactOut = bestTradeExactOutObj?.EOTC
  const v2Trade = isExactIn ? bestTradeExactIn : bestTradeExactOut
  const allowedPairs = isExactIn ? ExactInAllowedPairs : ExactOutAllowedPairs
  const v2TradeList = isExactIn ? bestTradeExactInObj : bestTradeExactOutObj
  // console.log(bestTradeExactInObj, 'bestTradeExactInObj')
  const v2Trades = isExactIn ? exactInTrades : exactOutTrades
  const currencyBalances = {
    [Field.INPUT]: relevantTokenBalances[0],
    [Field.OUTPUT]: relevantTokenBalances[1]
  }

  const currencies: { [field in Field]?: Currency } = {
    [Field.INPUT]: inputCurrency ?? undefined,
    [Field.OUTPUT]: outputCurrency ?? undefined
  }

  // 如果存在更好的汇率，获取v1交易的链接
  const v1Trade = useV1Trade(isExactIn, currencies[Field.INPUT], currencies[Field.OUTPUT], parsedAmount)

  let inputError: string | undefined
  if (!account) {
    inputError = '连接钱包'
  }

  if (!parsedAmount) {
    inputError = inputError ?? '输入金额'
  }

  if (!currencies[Field.INPUT] || !currencies[Field.OUTPUT]) {
    inputError = inputError ?? '选择代币'
  }

  const formattedTo = isAddress(to)
  if (!to || !formattedTo) {
    inputError = inputError ?? '输入收件人'
  } else {
    if (
      BAD_RECIPIENT_ADDRESSES.indexOf(formattedTo) !== -1 ||
      (bestTradeExactIn && involvesAddress(bestTradeExactIn, formattedTo)) ||
      (bestTradeExactOut && involvesAddress(bestTradeExactOut, formattedTo))
    ) {
      inputError = inputError ?? '收件人无效'
    }
  }

  const [allowedSlippage] = useUserSlippageTolerance()
  //  计算考虑滑点的情况下的输入 v2
  const slippageAdjustedAmounts = v2Trade && allowedSlippage && computeSlippageAdjustedAmounts(v2Trade, allowedSlippage)
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // 计算考虑滑点的情况下的输入 v1
  const slippageAdjustedAmountsV1 =
    v1Trade && allowedSlippage && computeSlippageAdjustedAmounts(v1Trade, allowedSlippage)

  // compare input balance to max input based on version
  // 比较用户的token余额与计算滑点后的输入数量
  const [balanceIn, amountIn] = [
    currencyBalances[Field.INPUT],
    toggledVersion === Version.v1
      ? slippageAdjustedAmountsV1
        ? slippageAdjustedAmountsV1[Field.INPUT]
        : null
      : slippageAdjustedAmounts
      ? slippageAdjustedAmounts[Field.INPUT]
      : null
  ]

  // 若余额小于计算滑点后的数量 则报错
  if (balanceIn && amountIn && balanceIn.lessThan(amountIn)) {
    inputError = amountIn.currency.symbol + ' 余额不足'
  }

  return {
    currencies,
    currencyBalances,
    parsedAmount,
    v2Trade: v2Trade ?? undefined,
    inputError,
    v1Trade,
    v2TradeList,
    allowedPairs,
    v2Trades
  }
}

function parseCurrencyFromURLParameter(urlParam: any): string {
  if (typeof urlParam === 'string') {
    const valid = isAddress(urlParam)
    if (valid) return valid
    // if (urlParam.toUpperCase() === 'BNB') return 'BNB'
    // if (valid === false) return 'BNB'
    if (urlParam.toUpperCase() === 'ETH') return 'ETH'
    if (valid === false) return 'ETH'
  }
  // return 'BNB' ?? ''
  return 'ETH' ?? ''
}

function parseTokenAmountURLParameter(urlParam: any): string {
  return typeof urlParam === 'string' && !isNaN(parseFloat(urlParam)) ? urlParam : ''
}

function parseIndependentFieldURLParameter(urlParam: any): Field {
  return typeof urlParam === 'string' && urlParam.toLowerCase() === 'output' ? Field.OUTPUT : Field.INPUT
}

const ENS_NAME_REGEX = /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)?$/
const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/
function validatedRecipient(recipient: any): string | null {
  if (typeof recipient !== 'string') return null
  const address = isAddress(recipient)
  if (address) return address
  if (ENS_NAME_REGEX.test(recipient)) return recipient
  if (ADDRESS_REGEX.test(recipient)) return recipient
  return null
}

export function queryParametersToSwapState(parsedQs: ParsedQs): SwapState {
  let inputCurrency = parseCurrencyFromURLParameter(parsedQs.inputCurrency)
  let outputCurrency = parseCurrencyFromURLParameter(parsedQs.outputCurrency)
  if (inputCurrency === outputCurrency) {
    if (typeof parsedQs.outputCurrency === 'string') {
      inputCurrency = ''
    } else {
      outputCurrency = ''
    }
  }

  const recipient = validatedRecipient(parsedQs.recipient)

  return {
    [Field.INPUT]: {
      currencyId: inputCurrency
    },
    [Field.OUTPUT]: {
      currencyId: outputCurrency
    },
    typedValue: parseTokenAmountURLParameter(parsedQs.exactAmount),
    independentField: parseIndependentFieldURLParameter(parsedQs.exactField),
    recipient
  }
}

// updates the swap state to use the defaults for a given network
export function useDefaultsFromURLSearch():
  | { inputCurrencyId: string | undefined; outputCurrencyId: string | undefined }
  | undefined {
  const { chainId } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const parsedQs = useParsedQueryString()
  const [result, setResult] = useState<
    { inputCurrencyId: string | undefined; outputCurrencyId: string | undefined } | undefined
  >()

  useEffect(() => {
    if (!chainId) return
    const parsed = queryParametersToSwapState(parsedQs)

    dispatch(
      replaceSwapState({
        typedValue: parsed.typedValue,
        field: parsed.independentField,
        inputCurrencyId: '0x55d398326f99059fF775485246999027B3197955',
        outputCurrencyId: '0x52445374E55a63C0De647445D5B6a4244702980C',
        // inputCurrencyId: parsed[Field.INPUT].currencyId,
        // outputCurrencyId: parsed[Field.OUTPUT].currencyId,
        recipient: parsed.recipient
      })
    )

    setResult({ inputCurrencyId: parsed[Field.INPUT].currencyId, outputCurrencyId: parsed[Field.OUTPUT].currencyId })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, chainId])

  return result
}
