// import { Contract } from '@ethersproject/contracts'
import { useActiveWeb3React } from './index'
import { getAggregationContract } from '../utils'
export async function useAggregation() {
  const { account, chainId, library } = useActiveWeb3React()
  const contract = getAggregationContract(chainId as any, library as any, account as string)
  // string name;    // DEX名称
  // address router;  // DEX路由合约
  // address connectors;  // 链接器地址
  // uint256 weightedRate;  // 兑换汇率
  // uint256 balanceA;  // tokenA余额
  // uint256 balanceB;  // tokenB余额
  // uint256 lpWeight;  // 资金池厚度
  // const tokenAddress =
  const result = await contract.getRate(
    '0x55d398326f99059fF775485246999027B3197955',
    '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'
  )
  console.log(result, 'result')

  return [...result.filter((item: { name: any }) => item.name)]
}
