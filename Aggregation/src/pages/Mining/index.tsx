// useContext 组件之间共享状态
import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'
import Stake from './Stake'
import Unstake from './Unstake'
import { Text } from 'rebass'
import lpimg from '../../assets/images/eotc-usdt.png'
import { Record } from './Record'
import { RowBetween } from '../../components/Row'
import { Link } from 'react-router-dom'
import { BoxSB, RecordLogo, LoadingRows } from './styleds'
import { ClickableText } from '../Pool/styleds'
import recordLogoDark from '../../assets/images/record_dark.png'
import recordLogo from '../../assets/images/record.png'
import backImg from '../../assets/svg/back.svg'
import backImgDark from '../../assets/svg/back1.svg'
import { useDarkModeManager } from '../../state/user/hooks'
import { useTranslation } from 'react-i18next'
export const APY_LIST: { [key: number]: number } = {
  6: 0.48,
  12: 0.72,
  24: 1
}
// import AppBody from '../AppBody'
export const MiningBody = styled.div`
  position: relative;
  width: 100%;
  /* background: ${({ theme }) => theme.bg1}; */
  @media screen and (min-width: 750px) {
    padding: 1rem;
    border-radius: 8px;
    max-width: 420px;
    background: ${({ theme }) => theme.bg1};
  }

  ${({ theme }) => theme.mediaWidth.upToLarge`
    max-width: 420px;
    `};
`
const _LpTag = styled.div`
  display: flex;
  align-items: center;
`

const LpImg = styled.img`
  width: 29px;
  height: 17px;
  margin-right: 5px;
`
const BackImg = styled.img`
  height: 14px;
  margin-right: 5px;
`
const FancyButton = styled.button`
  color: ${({ theme }) => theme.text1};
  align-items: center;
  /* height: 2rem; */
  border-radius: 24px;
  font-size: 12px;
  width: auto;
  min-width: 3rem;
  border: 2px solid transparent;
  outline: none;
  background: ${({ theme }) => theme.bg9};
  padding: 0.75rem 1.875rem;
`
const Option = styled(FancyButton)<{ active: boolean }>`
  :hover {
    cursor: pointer;
  }
  background-color: ${({ active, theme }) => active && theme.bg10};
  color: ${({ active, theme }) => (active ? theme.white : theme.text1)};
  border: ${({ active }) => active && '2px solid #237ff8;'};
`
export function LpTag() {
  return (
    <_LpTag>
      <LpImg src={lpimg} />
      <Text fontSize={14} fontWeight={400}>
        EOTC-USDT LP
      </Text>
    </_LpTag>
  )
}
export function GoBack({ onCilck }: { onCilck?: any }) {
  const [isDark] = useDarkModeManager()
  const { t } = useTranslation()
  return (
    <_LpTag style={{ cursor: 'pointer' }} onClick={onCilck}>
      <BackImg src={isDark ? backImg : backImgDark} />
      <Text fontSize={18} fontWeight={600}>
        {t('stakeRecords')}
      </Text>
    </_LpTag>
  )
}
export function RadioCycle({
  selectedDate,
  setSelectedDate
}: {
  selectedDate: number
  setSelectedDate: React.Dispatch<React.SetStateAction<number>>
}) {
  const { t } = useTranslation()
  return (
    <RowBetween>
      <Option
        onClick={() => {
          setSelectedDate(6)
        }}
        active={selectedDate === 6}
      >
        {t('months', { amount: 6 })}
      </Option>
      <Option
        onClick={() => {
          setSelectedDate(12)
        }}
        active={selectedDate === 12}
      >
        {t('months', { amount: 12 })}
      </Option>
      <Option
        onClick={() => {
          setSelectedDate(24)
        }}
        active={selectedDate === 24}
      >
        {t('months', { amount: 24 })}
      </Option>
    </RowBetween>
  )
}
export function RecordLink() {
  const theme = useContext(ThemeContext)
  const [isDark] = useDarkModeManager()
  const { t } = useTranslation()
  return (
    <Link to={'/mining/record'}>
      <BoxSB>
        <ClickableText fontWeight={400} fontSize={16} color={theme.text1}>
          {t('stakeRecords')}
        </ClickableText>
        <RecordLogo style={{ marginRight: '5px' }} src={!isDark ? recordLogoDark : recordLogo} />
      </BoxSB>
    </Link>
  )
}
export function PositionsLoadingPlaceholder() {
  return (
    <LoadingRows>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </LoadingRows>
  )
}

export default function Mining() {
  // Context Hook允许我们通过Hook来直接获取某个Context的值
  // const theme = useContext(ThemeContext)
  // const { account } = useActiveWeb3React()
  // const { path } = useRouteMatch() // 获取 path 参数, http://localhost:3000/a/:number // const{' '}

  return (
    <>
      <MiningBody>
        <Switch>
          <Route path={`/mining/stake`} component={Stake} />
          <Route path={`/mining/unstake`} component={Unstake} />
          <Route path={`/mining/record`} component={Record} />
          <Redirect to={{ pathname: '/mining/stake' }} />
        </Switch>
        {/* <AppBody>87</AppBody> */}
      </MiningBody>
    </>
  )
}
