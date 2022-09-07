// import { CONTRACT } from '../constants'
import { pack, keccak256 } from '@ethersproject/solidity'
import { getCreate2Address } from '@ethersproject/address'
import { Token } from 'eotc-bscswap-sdk'
interface ContractAddress {
  FACTORY: string
  INIT_CODE_HASH: string
}

export function getAddress(tokenA: Token, tokenB: Token, { FACTORY, INIT_CODE_HASH }: ContractAddress): string {
  let PAIR_ADDRESS_CACHE: { [token0Address: string]: { [token1Address: string]: string } } = {}
  // 检查当前实例是否按地址排序在另一个之前。
  const tokens = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA] // does safety checks
  if (PAIR_ADDRESS_CACHE?.[tokens[0].address]?.[tokens[1].address] === undefined) {
    PAIR_ADDRESS_CACHE = {
      ...PAIR_ADDRESS_CACHE,
      [tokens[0].address]: {
        ...PAIR_ADDRESS_CACHE?.[tokens[0].address],
        [tokens[1].address]: getCreate2Address(
          FACTORY,
          keccak256(['bytes'], [pack(['address', 'address'], [tokens[0].address, tokens[1].address])]),
          INIT_CODE_HASH
        )
      }
    }
  }
  return PAIR_ADDRESS_CACHE[tokens[0].address][tokens[1].address]
}
