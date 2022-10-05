/* eslint-disable @typescript-eslint/camelcase */
import TronWeb from 'tronweb'
const Config = {
  trongrid: {
    host: 'https://api.trongrid.io/', //https://api.trongrid.io
    key: '6b3e915b-6166-44eb-87c7-ae2ee3058d8b'
  },
  v2Contract: {
    poly: 'TFkCVEwDuu6HA61uUiwfyqt5HkGwtTQqFK',
    factory: 'TCxrpNBhybu5mKrRXLfQgwvzvENBZsdY8y',
    router: 'TYTEGJsKhkC5y7XY4w6eu2Najz9NnfaMZA'
  },
  remainTrx: 100
}

const chain = {
  privateKey: '01',
  fullHost: 'https://api.trongrid.io/'
}

const DATA_LEN = 64
export const MAX_UINT256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
const privateKey = chain.privateKey

const mainchain = new TronWeb({
  fullHost: chain.fullHost,
  privateKey
})

const { trongrid, v2Contract } = Config

if (trongrid && mainchain.setHeader && mainchain.fullNode.host === trongrid.host) {
  mainchain.setHeader({ 'TRON-PRO-API-KEY': trongrid.key })
}
export const getContract = () => {
  const swapContract = v2Contract
  return swapContract
}

export const tronObj = {
  tronWeb: null
}
// export const userAddress = window.tronWeb.defaultAddress.base58

export const trigger = async ({ address, functionSelector, parameters = [], options = {} }) => {
  try {
    const tronweb = tronObj.tronWeb
    // 构造智能合约交易信息
    const transaction = await tronweb.transactionBuilder.triggerSmartContract(
      address,
      functionSelector,
      Object.assign({ feeLimit: Config.remainTrx * 1e6 }, options),
      parameters
    )
    if (!transaction.result || !transaction.result.result) {
      throw new Error('Unknown trigger error: ' + JSON.stringify(transaction.transaction))
    }
    // 对交易信息进行签名
    const signedTransaction = await tronweb.trx.sign(transaction.transaction)
    // 将签名交易广播上链
    const result = await tronweb.trx.sendRawTransaction(signedTransaction)
    if (result && result.result) {
      console.log(result)
    }
    return result
  } catch (error) {
    console.log(error, 'error2')
    if (error == 'Confirmation declined by user') {
      class RejectError extends Error {
        constructor(message) {
          super(message)
          this.code = 4001
        }
      }
      console.log(`trigger error ${address} - ${functionSelector}`, error.message ? error.message : error)
      throw new RejectError('Confirmation declined by user')
    }
    return {}
  }
}
export const swapETHForExactTokens = async ({ router2Address, args, dependentValueSunBig }) => {
  const functionSelector = 'swapETHForExactTokens(uint256,address[],address,uint256)'
  const [amountOut, path, to, deadline] = args
  const parameters = [
    { type: 'uint256', value: amountOut },
    { type: 'address[]', value: path },
    { type: 'address', value: to },
    { type: 'uint256', value: deadline }
  ]
  const options = {
    callValue: dependentValueSunBig
  }
  return trigger({ address: router2Address, functionSelector, parameters, options })
}
export const swapExactTokensForTokens = async ({
  amountIn,
  amountOut,
  dependentValueSunBig,
  path,
  to,
  deadline,
  router2Address
}) => {
  const functionSelector = 'swapExactTokensForTokens(uint256,uint256,address[],address,uint256)'
  const parameters = [
    { type: 'uint256', value: amountIn },
    { type: 'uint256', value: amountOut },
    { type: 'address[]', value: path },
    { type: 'address', value: to },
    { type: 'uint256', value: deadline }
  ]
  const options = {}
  return trigger({ address: router2Address, functionSelector, parameters, options })
}
export const swapExactTokensForTRX = async ({
  amountIn,
  amountOut,
  dependentValueSunBig,
  path,
  to,
  deadline,
  router2Address
}) => {
  const functionSelector = 'swapTokensForExactETH(uint256,uint256,address[],address,uint256)'
  const parameters = [
    { type: 'uint256', value: amountOut },
    { type: 'uint256', value: amountIn },
    { type: 'address[]', value: path },
    { type: 'address', value: to },
    { type: 'uint256', value: deadline }
  ]
  const options = {}
  const result = await trigger({ address: router2Address, functionSelector, parameters, options })
  return result
}
export function swapFunc(methodName) {
  if (methodName === 'swapExactTokensForTokens') {
    return swapExactTokensForTokens
  } else if (methodName === 'swapETHForExactTokens' || methodName === 'swapExactTRXForTokens') {
    return swapETHForExactTokens
  } else if (methodName === 'swapExactTokensForTRX') {
    return swapExactTokensForTRX
  }
}

export const transfer = async ({ amount, to, contractAddress }) => {
  const functionSelector = 'transfer(address,uint256)'
  const parameters = [
    { type: 'address', value: to },
    { type: 'uint256', value: amount }
  ]
  const options = {
    shouldPollResponse: false
  }
  return trigger({ address: contractAddress, functionSelector, parameters, options })
}
