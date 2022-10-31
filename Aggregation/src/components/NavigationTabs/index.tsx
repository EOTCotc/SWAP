import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'
import { NavLink, Link as HistoryLink } from 'react-router-dom'

import { ArrowLeft } from 'react-feather'
import { RowBetween } from '../Row'
import QuestionHelper from '../QuestionHelper'

// space-evenly
const Tabs = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  border-radius: 3rem;
  justify-content: flex-start;
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 20px;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`
const StyledNavLinkMining = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 14px;
  font-weight: 400;
  width: 85px;
  height: 2.75rem;
  &.${activeClassName} {
    font-weight: 500;
    background: #237ff8;
    color: ${({ theme }) => theme.white};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`
const ActiveText = styled.div`
  font-weight: 500;
  font-size: 20px;
`

const StyledArrowLeft = styled(ArrowLeft)`
  color: ${({ theme }) => theme.text1};
`
const _MiningTabs = styled(Tabs)`
  background: ${({ theme }) => theme.color1};
  border-radius: 0.5rem;
`
export function SwapPoolTabs({ active }: { active: 'swap' | 'pool' }) {
  const { t } = useTranslation()
  return (
    <Tabs style={{ marginBottom: '20px' }}>
      <StyledNavLink
        style={{ margin: '0 50px 0 10px' }}
        id={`swap-nav-link`}
        to={'/swap'}
        isActive={() => active === 'swap'}
      >
        {t('swap')}
      </StyledNavLink>
      <StyledNavLink id={`pool-nav-link`} to={'/pool'} isActive={() => active === 'pool'}>
        {t('pool')}
      </StyledNavLink>
    </Tabs>
  )
}

export function FindPoolTabs() {
  const { t } = useTranslation()
  return (
    <Tabs>
      <RowBetween style={{ padding: '1rem' }}>
        <HistoryLink to="/pool">
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText>{t('importPool')}</ActiveText>
        <QuestionHelper text={t('importPoolQuestionHelper')} />
      </RowBetween>
    </Tabs>
  )
}

export function AddRemoveTabs({ adding }: { adding: boolean }) {
  const { t } = useTranslation()
  return (
    <Tabs>
      <RowBetween style={{ padding: '1rem' }}>
        <HistoryLink to="/pool">
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText>
          {adding ? t('add') : t('remove')} {t('liquidity')}
        </ActiveText>
        <QuestionHelper text={adding ? t('text1') : t('text2')} />
      </RowBetween>
    </Tabs>
  )
}
export function MiningTabs({ active }: { active: 'stake' | 'unstake' }) {
  const { t } = useTranslation()
  return (
    <_MiningTabs>
      <StyledNavLinkMining id={`mining-stake-nav-link`} to={'/mining/stake'} isActive={() => active === 'stake'}>
        {t('stake')}
      </StyledNavLinkMining>
      <StyledNavLinkMining id={`mining-unstake-nav-link`} to={'/mining/unstake'} isActive={() => active === 'unstake'}>
        {t('unstake')}
      </StyledNavLinkMining>
    </_MiningTabs>
  )
}
