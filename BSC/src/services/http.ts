import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'

import { showMessage } from './status'

// 返回res.data的interface
export interface Response {
  code: number | string
  data: any
  msg: string
}

const http: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [
    function(data) {
      //由于使用的 form-data传数据所以要格式化
      delete data?.Authorization
      // if (!header?.['Content-Type']) {
      //   return qs.stringify(data)
      // }
      return data && qs.stringify(data)
    }
  ]
})

// axios实例拦截响应
http.interceptors.response.use(
  (response: AxiosResponse) => {
    // if (response.headers.authorization) {
    //   localStorage.setItem('app_token', response.headers.authorization)
    // } else {
    //   if (response.data && response.data.token) {
    //     localStorage.setItem('app_token', response.data.token)
    //   }
    // }

    if (response.status === 200) {
      return response
    } else {
      console.error(showMessage(response.status))
      return response
    }
  },
  // 请求失败
  (error: any) => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status)
      return Promise.reject(response.data)
    } else {
      return console.error('网络连接异常,请稍后再试!')
    }
  }
)

// axios实例拦截请求
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // const token = localStorage.getItem('app_token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)
export interface StakepParams {
  net: string // 网络类型 bsc trx
  ads: string // 钱包地址
  hx: string // 交易哈希
  num: string // 交易数量,精度6位
  cycle: string // 交易周期
}
export interface UnstakepParams {
  id: string // 订单编号
  ads: string // 钱包地址
}
/**
 * @description: 质押
 * @params {ILogin} params
 * @return {Promise}
 */
export const stake = async (params: StakepParams): Promise<Response> => {
  const res = await http({
    method: 'post',
    url: `/api/SWAP/EOTC_LP?${qs.stringify(params)}`
  })
  return res.data
}
/**
 * @description: 赎回
 * @params {UnstakepParams} params
 * @return {Promise}
 */
export const unstake = async (params: UnstakepParams): Promise<Response> => {
  const res = await http({
    method: 'post',
    url: `api/SWAP/RansomLP?${qs.stringify(params)}`
  })
  return res.data
}
function handleorderNumber(arr: { id: any }[]) {
  return arr.map((item: { id: any }) => {
    while (item.id.length < 8) {
      item.id = '0' + item.id
    }
    return item
  })
}
export interface GetStakeRecordParams {
  net: string // 网络类型 bsc trx
  ads: string // 钱包地址
}
/**
 * @description: 质押记录
 * @params {ILogin} params
 * @return {Promise}
 */
export const getStakeRecord = async (params: GetStakeRecordParams): Promise<any> => {
  let res
  try {
    res = await http({
      method: 'post',
      url: `/api/SWAP/Mylp?${qs.stringify(params)}`
    })
    res = handleorderNumber(res.data as any)
    console.log(JSON.stringify(res))
    // res = [
    //   { num: '100.000000', cycle: '6', type: '2', date: '2022-10-03 11:29', id: '00000029' },
    //   { num: '100.000000', cycle: '6', type: '1', date: '2022-10-03 07:11', id: '00000028' }
    // ]
    return res
  } catch (e) {
    console.error(e)
    return []
  }

  // return res.data
}
