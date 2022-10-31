import React, { useState, useContext, useEffect, useCallback } from 'react'
import { ThemeContext } from 'styled-components'
import Header from './Header'
import { Text } from 'rebass'
import { BodyMining, Box, BoxSB, OrderCard } from './styleds'
import { ClickableText } from '../Pool/styleds'
import { AutoColumn } from '../../components/Column'
import { RowEnd } from '../../components/Row'
import { RadioCycle, RecordLink } from './index'
import { APY_LIST } from './index'
import { useGetStakeRecord } from './hook'
import { ButtonUnStake } from './ButtonUnStake'
import { useGetLpTokenBalance } from './hook'
import { useTranslation } from 'react-i18next'

export default function UnStake() {
  const theme = useContext(ThemeContext)
  const { t } = useTranslation()
  const [selectedDate, setSelectedDate] = useState(6)
  const [stakeRecord] = useGetStakeRecord()
  const [unstakeData, setUnstakeData] = useState([])
  const { userPoolBalance } = useGetLpTokenBalance()
  const handleStakeRecordData = useCallback(() => {
    setUnstakeData(stakeRecord.filter((item: any) => item.cycle == selectedDate && item.type === '2'))
  }, [selectedDate, stakeRecord])
  function delSetUnstakeData(id: string) {
    setUnstakeData(unstakeData.filter((item: any) => item.id !== id))
  }
  useEffect(() => {
    handleStakeRecordData()
  }, [handleStakeRecordData])

  return (
    <>
      <Header active={'unstake'} />
      <BodyMining>
        <RadioCycle selectedDate={selectedDate} setSelectedDate={setSelectedDate}></RadioCycle>
        <Box mt="33px">
          <BoxSB>
            <ClickableText fontWeight={400} fontSize={16} color={theme.text1}>
              {t('stake')}LP (LP: {userPoolBalance ? userPoolBalance.toSignificant(4) : '-'})
            </ClickableText>
            <RecordLink></RecordLink>
          </BoxSB>
        </Box>

        {unstakeData.map((item: any) => (
          <Box key={item.id} mt="15px">
            <OrderCard>
              <BoxSB>
                <Text fontWeight={400} fontSize={14} color={theme.text7}>
                  {t('orderNumber')}: {item.id}
                </Text>
                <Text fontWeight={400} fontSize={14} color={theme.text8}>
                  {item.date}
                </Text>
              </BoxSB>
              <Box mt="20px">
                <RowEnd>
                  <AutoColumn style={{ width: '50%' }} gap="md">
                    <Text fontWeight={400} fontSize={14} color={theme.text8}>
                      {t('numberStake')}
                    </Text>
                    <Text fontWeight={'bold'} fontSize={20} color={theme.text7}>
                      {item.num}
                    </Text>
                  </AutoColumn>
                  <AutoColumn style={{ width: '50%' }} gap="md">
                    <Text fontWeight={400} fontSize={14} color={theme.text8}>
                      {t('estimatedEarnings')}
                    </Text>
                    <Text fontWeight={'bold'} fontSize={20} color={'#E6B37C'}>
                      + {item.num * APY_LIST[selectedDate]} EOTC
                    </Text>
                  </AutoColumn>
                </RowEnd>
              </Box>
              <Box mt="15px">
                <BoxSB>
                  {/* <ButtonLeft style={{ marginRight: '15px' }}>
                  <Text fontWeight={400} fontSize={16} color={'#237FF8'}>
                    继续质押
                  </Text>
                </ButtonLeft> */}
                  <ButtonUnStake id={item.id} delSetUnstakeData={delSetUnstakeData}>
                    {t('unstake')}
                  </ButtonUnStake>
                </BoxSB>
              </Box>
            </OrderCard>
          </Box>
        ))}
      </BodyMining>
      {unstakeData.length === 0 && (
        <Box mt="15px">
          <BodyMining>
            <Text style={{ textAlign: 'center' }} fontWeight={400} fontSize={14} color={'#818DA8'}>
              {t('noData')}
            </Text>
          </BodyMining>
        </Box>
      )}
      <Box mt="15px">
        <BodyMining>
          <Text fontWeight={400} fontSize={14} color={'#818DA8'}>
            {t('text9')}
          </Text>
        </BodyMining>
      </Box>
    </>
  )
}
