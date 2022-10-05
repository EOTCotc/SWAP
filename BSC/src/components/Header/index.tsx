import { ChainId } from 'eotc-bscswap-sdk'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'
import { darken } from 'polished'
import styled from 'styled-components'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from '../../assets/svg/logo2.svg'
import LogoDark from '../../assets/svg/logo2.svg'
// import Wordmark from '../../assets/svg/wordmark.svg'
// import WordmarkDark from '../../assets/svg/wordmark_white.svg'
import { useActiveWeb3React } from '../../hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances } from '../../state/wallet/hooks'
import NetworkSelector from './NetworkSelector'
import { YellowCard } from '../Card'
import Settings from '../Settings'
import Menu from '../Menu'

import Row from '../Row'
import Web3Status from '../Web3Status'
import VersionSwitch from './VersionSwitch'
import { getChainInfo } from '../../constants/chainInfo'

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  top: 0;
  position: absolute;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 12px 0 0 0;
    width: calc(100%);
    position: relative;
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    // margin-top: 0.5rem;
`};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  text-decoration: none;

  :hover {
    cursor: pointer;
  }
`

const TitleText = styled(Row)`
  width: fit-content;
  white-space: nowrap;
  font-size: 24px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;

  :focus {
    border: 1px solid blue;
  }
`

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;
`

const NetworkCard = styled(YellowCard)`
  width: fit-content;
  margin-right: 10px;
  border-radius: 12px;
  padding: 8px 12px;
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  margin-right: 10px;
  :hover {
    transform: rotate(-5deg);
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`

    img { 
      width: 1.8rem;
      // position: absolute;
      left: 50%;
      // transform: translateX(-50%);
      top: 28px;
      pointer-events:none;
    }
  `};
`
const RowBetweenHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem 1rem 0 1rem;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    align-items: center;
  `};
`
const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    // flex-direction: column;
    // align-items: flex-end;
    // margin-top: 50px
  `};
`
const activeClassName = 'active'
const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`
const HeaderLinks = styled(Row)`
  justify-self: center;
  /* background-color: ${({ theme }) => theme.bg0}; */
  width: max-content;
  padding: 2px;
  border-radius: 16px;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  overflow: auto;
  align-items: center;
  @media screen and (min-width: 750px) {
      justify-self: start;
      margin-left: 80px;
     }
  ${({ theme }) => theme.mediaWidth.upToLarge`
    justify-self: start;
    margin-left: 80px;
    `};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    justify-self: center;
  `};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 100%;
    border-radius: inherit;
    padding: 0 47px;
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    z-index: 99;
    position: fixed;
    bottom: 0; right: 50%;
    transform: translate(50%);
    margin: 0 auto;
    background-color: ${({ theme }) => theme.bg0};
    // border: 1px solid ${({ theme }) => theme.bg2};
    box-shadow: 0px 6px 10px rgb(0 0 0 / 2%);
    // border-top: 1px solid;
    // border-top-color: ${({ theme }) => theme.color2};
  `};
`
const StyledNavLink = styled(NavLink)`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  /* border-radius: 3rem; */
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  padding: 14px 0;
  word-break: break-word;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 400;
  @media screen and (min-width: 750px) {
    margin-left: 47px;
  }
  ${({ theme }) => theme.mediaWidth.upToLarge`
    margin-left: 47px;
    `};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-left: 0;
    `};
  &.${activeClassName} {
    /* border-radius: 14px; */
    font-weight: bold;
    justify-content: center;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`
const Trans = styled.div``
// ChainId.BSC是在sdk中添加的， 对应的值Bsc只是一个展示
const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
  [ChainId.MAINNET]: null,
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.BSC]: 'BSC',
  [ChainId.BSC_TSET]: 'BSC_TSET',
  [ChainId.MATIC]: 'MATIC'
}

export default function Header() {
  const { account, chainId } = useActiveWeb3React()
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const [isDark] = useDarkModeManager()
  const nativeCurrency = getChainInfo(chainId)?.nativeCurrency
  const { pathname } = useLocation()
  const isPoolActive =
    pathname.startsWith('/pool') ||
    pathname.startsWith('/add') ||
    pathname.startsWith('/remove') ||
    pathname.startsWith('/increase') ||
    pathname.startsWith('/find')
  return (
    <HeaderFrame>
      <RowBetweenHeader>
        <HeaderElement>
          <Title href=".">
            <UniIcon>
              <img src={isDark ? Logo : LogoDark} alt="logo" />
            </UniIcon>
            <TitleText>
              {/* <img style={{ marginLeft: '4px', marginTop: '4px' }} src={isDark ? Wordmark : WordmarkDark} alt="logo" /> */}
              <span style={isDark ? { color: 'black' } : { color: 'white' }}> EOTC</span>
            </TitleText>
          </Title>
          <HeaderLinks>
            <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
              <Trans>兑换</Trans>
            </StyledNavLink>
            <StyledNavLink
              data-cy="pool-nav-link"
              id={`pool-nav-link`}
              to={'/pool'}
              className={isPoolActive ? activeClassName : undefined}
            >
              <Trans>流动池</Trans>
            </StyledNavLink>
            <StyledNavLink data-cy="mining-nav-link" id={`mining-nav-link`} to={'/mining'}>
              <Trans>挖矿</Trans>
            </StyledNavLink>
          </HeaderLinks>
        </HeaderElement>
        <HeaderControls>
          <HeaderElement>
            <NetworkSelector />
          </HeaderElement>

          {!isMobile && (
            <HeaderElement>
              {/* <TestnetWrapper>
                {!isMobile && chainId && NETWORK_LABELS[chainId] && (
                  <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>
                )}
              </TestnetWrapper> */}
              <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
                {account && userEthBalance ? (
                  <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                    {userEthBalance?.toSignificant(4)} {nativeCurrency?.symbol}
                    {/* {userEthBalance?.toSignificant(4)} ETH */}
                  </BalanceText>
                ) : null}
                <Web3Status />
              </AccountElement>
            </HeaderElement>
          )}

          <HeaderElementWrap>
            <VersionSwitch />
            <Settings />
            <Menu />
          </HeaderElementWrap>
        </HeaderControls>
      </RowBetweenHeader>
      {isMobile && (
        <RowBetweenHeader style={{ justifyContent: 'flex-end' }}>
          <HeaderElement>
            <TestnetWrapper>
              {!isMobile && chainId && NETWORK_LABELS[chainId] && <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>}
            </TestnetWrapper>
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              {account && userEthBalance ? (
                <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                  {userEthBalance?.toSignificant(4)} {nativeCurrency?.symbol}
                  {/* {userEthBalance?.toSignificant(4)} ETH */}
                </BalanceText>
              ) : null}
              <Web3Status />
            </AccountElement>
          </HeaderElement>
        </RowBetweenHeader>
      )}
    </HeaderFrame>
  )
}
