import { TokenAmount, Pair, Currency, Token } from '@eotcswap/swap-sdk'
import { useCallback, useMemo } from 'react'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { Interface } from '@ethersproject/abi'
import { useActiveWeb3React } from '../hooks'

import { useMultipleContractSingleData } from '../state/multicall/hooks'
import { wrappedCurrency } from '../utils/wrappedCurrency'
import { CONTRACT, EOTCUSDTLPTOKEN } from '../constants'

const PAIR_INTERFACE = new Interface(IUniswapV2PairABI)

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID
}
interface Resultses {
  [key: string]: [PairState, Pair | null][]
}
export function usePairs(currencies: [Currency | undefined, Currency | undefined][]): [PairState, Pair | null][] {
  const { chainId /*library*/ } = useActiveWeb3React()

  const tokens = useMemo(
    () =>
      currencies.map(([currencyA, currencyB]) => [
        wrappedCurrency(currencyA, chainId),
        wrappedCurrency(currencyB, chainId)
      ]),
    [chainId, currencies]
  )

  const pairAddresses = useMemo(
    () =>
      tokens.map(([tokenA, tokenB]) => {
        return tokenA && tokenB && !tokenA.equals(tokenB) ? Pair.getAddress(tokenA, tokenB) : undefined
      }),
    [tokens]
  )

  const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')

  return useMemo(() => {
    return results.map((result, i) => {
      const { result: reserves, loading } = result
      const tokenA = tokens[i][0]
      const tokenB = tokens[i][1]

      if (loading) return [PairState.LOADING, null]
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null]
      if (!reserves) return [PairState.NOT_EXISTS, null]
      const { reserve0, reserve1 } = reserves
      const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
      const tokenAmountA = new TokenAmount(token0, reserve0.toString())
      const tokenAmountB = new TokenAmount(token1, reserve1.toString())
      const tokenAmounts = tokenAmountA.token.sortsBefore(tokenAmountB.token) // does safety checks
        ? [tokenAmountA, tokenAmountB]
        : [tokenAmountB, tokenAmountA]

      const liquidityTokenAddress = Pair.getAddressPor(tokenA, tokenB, {
        FACTORY: CONTRACT['EOTC'].FACTORY,
        INIT_CODE_HASH: CONTRACT['EOTC'].INIT_CODE_HASH
      })
      console.log(liquidityTokenAddress, 'liquidityTokenAddress')

      const isEOTCUSDT = liquidityTokenAddress && liquidityTokenAddress?.toLowerCase() === EOTCUSDTLPTOKEN.toLowerCase()
      const decimals = isEOTCUSDT ? 6 : 18
      const liquidityToken = new Token(
        tokenAmounts[0].token.chainId,
        liquidityTokenAddress,
        decimals,
        'EOTC-V2',
        'Eotc swap'
      )

      return [PairState.EXISTS, new Pair(tokenAmountA, tokenAmountB, liquidityToken)]
    })
  }, [results, tokens])
}
export function usePairsPor(currencies: [Currency | undefined, Currency | undefined][]): Resultses {
  const { chainId } = useActiveWeb3React()
  const tokens = useMemo(
    () =>
      currencies.map(([currencyA, currencyB]) => [
        wrappedCurrency(currencyA, chainId),
        wrappedCurrency(currencyB, chainId)
      ]),
    [chainId, currencies]
  )
  interface PairAddressesObj {
    [key: string]: any
  }

  // ??????tokenA tokenB ??????pair address
  const pairAddresses = useMemo(() => {
    const pairAddressesObj: PairAddressesObj = {}
    for (const item in CONTRACT) {
      pairAddressesObj[item] = tokens.map(([tokenA, tokenB]) => {
        return tokenA && tokenB && !tokenA.equals(tokenB)
          ? Pair.getAddressPor(tokenA, tokenB, {
              FACTORY: CONTRACT[item].FACTORY,
              INIT_CODE_HASH: CONTRACT[item].INIT_CODE_HASH
            })
          : undefined
      })
    }
    return Object.assign(pairAddressesObj, {})
  }, [tokens])

  const resultses = useCallback(() => {
    const res: Resultses = {}
    for (const item in pairAddresses) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const results = useMultipleContractSingleData(pairAddresses[item], PAIR_INTERFACE, 'getReserves')
      res[item] = results.map((result, i) => {
        const { result: reserves, loading } = result
        const tokenA = tokens[i][0]
        const tokenB = tokens[i][1]
        if (loading) return [PairState.LOADING, null]
        if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null]
        if (!reserves) return [PairState.NOT_EXISTS, null]
        const { reserve0, reserve1 } = reserves
        const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
        const tokenAmountA = new TokenAmount(token0, reserve0.toString())
        const tokenAmountB = new TokenAmount(token1, reserve1.toString())
        const tokenAmounts = tokenAmountA.token.sortsBefore(tokenAmountB.token) // does safety checks
          ? [tokenAmountA, tokenAmountB]
          : [tokenAmountB, tokenAmountA]

        const liquidityTokenAddress = Pair.getAddressPor(tokenA, tokenB, {
          FACTORY: CONTRACT[item].FACTORY,
          INIT_CODE_HASH: CONTRACT[item].INIT_CODE_HASH
        })
        console.log(liquidityTokenAddress, 'liquidityTokenAddress')

        const isEOTCUSDT =
          liquidityTokenAddress && liquidityTokenAddress?.toLowerCase() === EOTCUSDTLPTOKEN.toLowerCase()
        const decimals = isEOTCUSDT ? 6 : 18
        const liquidityToken = new Token(
          tokenAmounts[0].token.chainId,
          liquidityTokenAddress,
          decimals,
          'EOTC-V2',
          'Eotc swap'
        )

        return [PairState.EXISTS, new Pair(tokenAmountA, tokenAmountB, liquidityToken)]
      })
    }
    return res
  }, [pairAddresses, tokens])

  return resultses()
}
export function usePair(tokenA?: Currency, tokenB?: Currency): [PairState, Pair | null] {
  return usePairs([[tokenA, tokenB]])[0]
}
