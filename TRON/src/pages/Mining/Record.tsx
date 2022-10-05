import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Text } from 'rebass'
import { RowEnd } from '../../components/Row'
import { AutoColumn } from '../../components/Column'
import { Box, OrderCard, BoxSB, LoadingRows } from './styleds'
import { useGetStakeRecord } from './hook'
import { APY_LIST, LpTag, GoBack /*PositionsLoadingPlaceholder*/ } from './index'
import { ButtonUnStake } from './ButtonUnStake'
const EarningsCard = styled.div`
  width: 100%;
  padding: 15px 40px 20px 40px;
  background: linear-gradient(134deg, #2a86ff 0%, #54dcff 100%);
  border-radius: 10px;
`
const _PledgeTag = styled.div<{
  type?: '0' | '1' | '2' | '3' | '4' | string
}>`
  background: ${({ type, theme }) =>
    (type === '0' && theme.bg12) ||
    (type === '1' && theme.bg12) ||
    (type === '2' && theme.bg13) ||
    (type === '3' && theme.bg11) ||
    (type === '4' && theme.bg11)};
  border-radius: 15px 0px 0px 15px;
  padding: 6px 15px;
  color: ${({ type, theme }) =>
    (type === '0' && theme.text10) ||
    (type === '1' && theme.text10) ||
    (type === '2' && '#1178FF') ||
    (type === '3' && '#999999') ||
    (type === '4' && '#999999')};
`
export function PledgeTag({ type }: { type: string }) {
  return (
    <_PledgeTag type={type}>
      <Text style={{ lineHeight: '25px' }} fontWeight={400} fontSize={14}>
        {type === '0'
          ? '确认中'
          : type === '1'
          ? '质押中'
          : type === '2'
          ? '待赎回'
          : type === '3'
          ? '赎回中'
          : type === '4'
          ? '已赎回'
          : ''}
      </Text>
    </_PledgeTag>
  )
}
// eslint-disable-next-line react/prop-types
export function Record({ history }: { history: any }) {
  // history.goBack()
  const theme = useContext(ThemeContext)
  const [stakeRecord, , loading] = useGetStakeRecord()
  const [unstakeData, setUnstakeData] = useState([])

  const handleStakeRecordData = useCallback(() => {
    const array = stakeRecord.map((item: any) => {
      // if (Date.now() > Date.parse(item.date) + item.cycle * 30 * 24 * 60 * 60 * 1000) {
      //   item.type = '2'
      // }
      item.earnings = item.num * APY_LIST[item.cycle]
      return item
    })

    setUnstakeData(array)
  }, [stakeRecord])
  const data: { accEarnings: number; atStake: number; toRedeem: number } = useMemo(() => {
    const temp = {
      accEarnings: 0, //累计收益
      atStake: 0, // 当前质押
      toRedeem: 0 //待赎回
    }
    // 累计收益
    temp.accEarnings = stakeRecord
      .filter((item: { type: string; earnings: any }) => item.type === '4' && item.earnings)
      .reduce((acc: any, item: { earnings: any }) => acc + item.earnings, 0)
    // 当前质押
    temp.atStake = stakeRecord
      .filter((item: { type: string; earnings: any; num: string }) => item.type === '1' && item.num)
      .reduce((acc: any, item: any) => acc + Number(item.num), 0)
    // 待赎回
    temp.toRedeem = stakeRecord
      .filter((item: { type: string; earnings: any; num: string }) => item.type === '2' && item.num)
      .reduce((acc: any, item: any) => acc + Number(item.num), 0)
    return temp
  }, [stakeRecord])

  function delSetUnstakeData(id: string) {
    const array = unstakeData.map((item: any) => {
      if (item.id === id) {
        item.type = '3'
      }
      return item
    })
    setUnstakeData(array as any)
  }
  useEffect(() => {
    handleStakeRecordData()
  }, [handleStakeRecordData])
  return (
    <>
      <Box mb="30px" mt="4px">
        <BoxSB>
          <GoBack
            onCilck={() => {
              return history.goBack()
            }}
          ></GoBack>
          <LpTag></LpTag>
        </BoxSB>
      </Box>

      <EarningsCard>
        <Text style={{ textAlign: 'center' }} fontWeight={400} fontSize={14} color={'#FFFFFF'}>
          累计收益
        </Text>
        <Text
          style={{ textAlign: 'center', lineHeight: '25px', marginTop: '5px' }}
          fontWeight={'bold'}
          fontSize={22}
          color={'#FFFFFF'}
        >
          +{data.accEarnings}
        </Text>
        <Box mt={'10px'}>
          <RowEnd>
            <AutoColumn style={{ width: '50%' }} gap="md">
              <Text fontWeight={400} fontSize={14} color={'#FFFFFF'}>
                当前质押
              </Text>
              <Text style={{ lineHeight: '25px' }} fontWeight={'bold'} fontSize={18} color={'#FFFFFF'}>
                {data.atStake}
              </Text>
            </AutoColumn>
            <AutoColumn style={{ width: '50%', justifyContent: 'end' }} gap="md">
              <Text fontWeight={400} fontSize={14} color={'#ffffff'}>
                待赎回
              </Text>
              <Text style={{ lineHeight: '25px' }} fontWeight={'bold'} fontSize={18} color={'#ffffff'}>
                {data.toRedeem}
              </Text>
            </AutoColumn>
          </RowEnd>
        </Box>
      </EarningsCard>
      {loading ? (
        <Box mt="15px">
          <OrderCard style={{ paddingRight: 0 }}>
            <RowEnd style={{ alignItems: 'flex-start' }}>
              <AutoColumn style={{ width: '50%' }} gap="sm">
                <LoadingRows>
                  <Text fontWeight={400} fontSize={14} color={'#FFFFFF'}></Text>
                </LoadingRows>
                <LoadingRows>
                  <Text fontWeight={400} fontSize={14} color={theme.text8}></Text>
                </LoadingRows>
              </AutoColumn>
              <AutoColumn style={{ width: '50%', justifyContent: 'end' }} gap="sm">
                {/* <PledgeTag type={item.type}></PledgeTag> */}
                <LoadingRows>
                  <Text fontWeight={400} fontSize={14} color={theme.text8}></Text>
                </LoadingRows>
              </AutoColumn>
            </RowEnd>
            <Box mt={'20px'} pr={'0.93rem'}>
              <RowEnd style={{ alignItems: 'flex-start' }}>
                <AutoColumn style={{ width: '100%' }} gap="sm">
                  <LoadingRows>
                    <Text fontWeight={400} fontSize={14} color={'#FFFFFF'}></Text>
                  </LoadingRows>
                  <LoadingRows>
                    <Text fontWeight={400} fontSize={14} color={theme.text8}></Text>
                  </LoadingRows>
                </AutoColumn>
              </RowEnd>
            </Box>
          </OrderCard>
        </Box>
      ) : (
        unstakeData.map((item: any) => (
          <Box key={item.id} mt="15px">
            <OrderCard style={{ paddingRight: 0 }}>
              <RowEnd style={{ alignItems: 'flex-start' }}>
                <AutoColumn style={{ width: '50%' }} gap="sm">
                  <Text fontWeight={400} fontSize={14} color={theme.text7}>
                    订单编号: {item.id}
                  </Text>
                  <Text fontWeight={400} fontSize={14} color={theme.text8}>
                    {item.date}
                  </Text>
                </AutoColumn>
                <AutoColumn style={{ width: '50%', justifyContent: 'end' }} gap="sm">
                  <PledgeTag type={item.type}></PledgeTag>
                </AutoColumn>
              </RowEnd>
              <Box mt={'20px'} pr={'0.93rem'}>
                <RowEnd>
                  <AutoColumn style={{ width: '50%' }} gap="md">
                    <div style={{ textAlign: 'center' }}>
                      <Text fontWeight={400} fontSize={14} color={'#90939B'}>
                        质押数量
                      </Text>
                      <Text
                        style={{ lineHeight: '25px', marginTop: '5px' }}
                        fontWeight={'bold'}
                        fontSize={18}
                        color={theme.text7}
                      >
                        {item.num}
                      </Text>
                    </div>
                  </AutoColumn>
                  <AutoColumn style={{ width: '50%' }} gap="md">
                    <div style={{ textAlign: 'center' }}>
                      <Text fontWeight={400} fontSize={14} color={'#90939B'}>
                        预估收益
                      </Text>
                      <Text
                        style={{ lineHeight: '25px', marginTop: '5px' }}
                        fontWeight={'bold'}
                        fontSize={18}
                        color={theme.text9}
                      >
                        {item.earnings} EOTC
                      </Text>
                    </div>
                  </AutoColumn>
                  {/* <AutoColumn style={{ width: '33%' }} gap="md">
                    <div style={{ textAlign: 'center' }}>
                      <Text fontWeight={400} fontSize={14} color={'#fffff'}>
                        到期可赎回
                      </Text>
                      <Text
                        style={{ lineHeight: '25px', marginTop: '5px' }}
                        fontWeight={'bold'}
                        fontSize={18}
                        color={'#ffffff'}
                      >
                        {item.earnings}
                      </Text>
                    </div>
                  </AutoColumn> */}
                </RowEnd>
                {item.type === '2' && (
                  <Box mt={'15px'}>
                    <ButtonUnStake id={item.id} delSetUnstakeData={delSetUnstakeData}>
                      赎回
                    </ButtonUnStake>
                  </Box>
                )}
              </Box>
            </OrderCard>
          </Box>
        ))
      )}
      {unstakeData.length === 0 && (
        <Box mt="15px">
          <OrderCard>
            <Text style={{ textAlign: 'center' }} fontWeight={400} fontSize={14} color={'#818DA8'}>
              没有数据
            </Text>
          </OrderCard>
        </Box>
      )}
    </>
  )
}
