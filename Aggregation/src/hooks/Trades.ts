import { Currency, CurrencyAmount, Pair, Token, Trade } from 'eotc-bscswap-sdk'
import flatMap from 'lodash.flatmap'
import { useMemo } from 'react'
// import { CONTRACT } from '../constants'

import { BASES_TO_CHECK_TRADES_AGAINST, CUSTOM_BASES, Trades } from '../constants'
import { PairState, usePairsPor } from '../data/Reserves'
import { wrappedCurrency } from '../utils/wrappedCurrency'

import { useActiveWeb3React } from './index'
// 筛选 tokenA 和 tokenB 所有可用的交易对（包含中转交易对）
function useAllCommonPairs(currencyA?: Currency, currencyB?: Currency): any {
  const { chainId } = useActiveWeb3React()
  // 默认的中转token
  // 主网有 WETH, DAI, USDC, USDT, COMP, MKR, WBTC
  // 测试网 只有 WETH
  const bases: Token[] = chainId ? BASES_TO_CHECK_TRADES_AGAINST[chainId] : []
  //basePairs 由bases两两配对组成的交易对列表
  const [tokenA, tokenB] = chainId
    ? [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)]
    : [undefined, undefined]

  const basePairs: [Token, Token][] = useMemo(
    () =>
      flatMap(bases, (base): [Token, Token][] => bases.map(otherBase => [base, otherBase])).filter(
        ([t0, t1]) => t0.address !== t1.address
      ),
    [bases]
  )
  // console.log(basePairs, 'basePairs') => []
  //在所有可能的中转交易对中进行筛选
  const allPairCombinations: [Token, Token][] = useMemo(
    () =>
      tokenA && tokenB
        ? [
            // 单个交易池，返回两个token本身组成的交易对
            // the direct pair
            [tokenA, tokenB],
            // token A against all bases
            // tokenA 和其他bases token组成的交易对
            ...bases.map((base): [Token, Token] => [tokenA, base]),
            // token B against all bases
            ...bases.map((base): [Token, Token] => [tokenB, base]),
            // each base against all bases
            ...basePairs
          ] // 交易对两个token存在，且地址不同
            .filter((tokens): tokens is [Token, Token] => Boolean(tokens[0] && tokens[1]))
            .filter(([t0, t1]) => t0.address !== t1.address)
            // 某些token只能通过特定的交易对交易，需要排除
            .filter(([tokenA, tokenB]) => {
              if (!chainId) return true
              const customBases = CUSTOM_BASES[chainId]
              if (!customBases) return true

              const customBasesA: Token[] | undefined = customBases[tokenA.address]
              const customBasesB: Token[] | undefined = customBases[tokenB.address]

              if (!customBasesA && !customBasesB) return true

              if (customBasesA && !customBasesA.find(base => tokenB.equals(base))) return false
              if (customBasesB && !customBasesB.find(base => tokenA.equals(base))) return false

              return true
            })
        : [],
    [tokenA, tokenB, bases, basePairs, chainId]
  )
  // const allPairs = usePairs(allPairCombinations)
  const allPairs1 = usePairsPor(allPairCombinations)
  // only pass along valid pairs, non-duplicated pairss
  // 校验合法性和去重
  return useMemo(() => {
    const newAllPairs: any = Object.assign(allPairs1, {})
    for (const pairs in allPairs1) {
      newAllPairs[pairs] = Object.values(
        allPairs1[pairs]
          // filter out invalid pairs
          //  交易池子需要存在
          .filter((result): result is [PairState.EXISTS, Pair] => Boolean(result[0] === PairState.EXISTS && result[1]))
          // filter out duplicated pairs
          //  去重
          .reduce<{ [pairAddress: string]: Pair }>((memo, [, curr]) => {
            memo[curr.liquidityToken.address] = memo[curr.liquidityToken.address] ?? curr
            return memo
          }, {})
      )
    }
    return newAllPairs
  }, [allPairs1])
}
export interface TradeList {
  [key: string]: Trade | null
}
/**
 * Returns the best trade for the exact amount of tokens in to the given token out
 * 将输入代币的确切数量的最佳交易返回给给定的代币
 */
export function useTradeExactIn(
  currencyAmountIn?: CurrencyAmount,
  currencyOut?: Currency
): {
  TradeList: TradeList | null
  allowedPairs: {
    [key: string]: [Pair | null]
  }
  Trades: Trades
} {
  // 允许的交易对
  const allowedPairs = useAllCommonPairs(currencyAmountIn?.currency, currencyOut)
  return useMemo(() => {
    const TradeList: TradeList = {}
    const Trades: Trades = []
    if (!currencyAmountIn || !currencyOut) {
      return { allowedPairs, TradeList: null, Trades }
    }
    for (const item in allowedPairs) {
      if (allowedPairs[item].length > 0) {
        const trade =
          Trade.bestTradeExactIn(allowedPairs[item], currencyAmountIn, currencyOut, {
            maxHops: 3,
            maxNumResults: 1
          })[0] ?? null
        TradeList[item] = trade
        Trades.push({ name: item, trade, pairs: allowedPairs[item] })
      } else {
        TradeList[item] = null
      }
    }
    return { allowedPairs, TradeList, Trades: [...Trades] }
    // if (currencyAmountIn && currencyOut && allowedPairs.length > 0) {
    //   // console.log(
    //   //   '43434',
    //   //   Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, { maxHops: 3, maxNumResults: 1 })[0] ?? null
    //   // )
    //   return (
    //     /**
    //      * allowedPairs  Pairs列表
    //      * currencyAmountIn 输入数量
    //      * currencyOut 输出数量
    //      * 给定一个配对列表、一个固定的输入量和输出的代币数量，此方法返回将maxNumResults输入代币数量交换为输出代币的最佳交易，最多进行一次maxHops跳跃。返回的交易按输出量按降序排序，并且都共享给定的输入量。
    //      */
    //     Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, { maxHops: 3, maxNumResults: 1 })[0] ?? null
    //   )
    // }
    // return null
  }, [allowedPairs, currencyAmountIn, currencyOut])
}

/**
 * Returns the best trade for the token in to the exact amount of token out
 */
export function useTradeExactOut(
  currencyIn?: Currency,
  currencyAmountOut?: CurrencyAmount
): {
  TradeList: TradeList | null
  allowedPairs: {
    [key: string]: [Pair | null]
  }
  Trades: Trades
} {
  const allowedPairs = useAllCommonPairs(currencyIn, currencyAmountOut?.currency)

  return useMemo(() => {
    const TradeList: TradeList = {}
    const Trades: Trades = []
    if (!currencyAmountOut || !currencyIn) {
      return { allowedPairs, TradeList: null, Trades }
    }
    for (const item in allowedPairs) {
      if (allowedPairs[item].length > 0) {
        const trade =
          Trade.bestTradeExactIn(allowedPairs[item], currencyAmountOut, currencyIn, {
            maxHops: 3,
            maxNumResults: 1
          })[0] ?? null
        Trades.push({ name: item, trade, pairs: allowedPairs[item] })
        TradeList[item] = trade
      } else {
        TradeList[item] = null
      }
    }
    return { allowedPairs, TradeList, Trades: [...Trades] }
  }, [allowedPairs, currencyIn, currencyAmountOut])
}
