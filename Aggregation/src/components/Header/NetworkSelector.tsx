import { useWeb3React } from '@web3-react/core'
import { getChainInfo } from '../../constants/chainInfo'
import { SupportedChainId } from '../../constants/chains'
import { useActiveWeb3React } from '../../hooks'
import useSelectChain from '../../hooks/useSelectChain'
// import useSyncChainQuery from 'hooks/useSyncChainQuery'
import { darken } from 'polished'
import React, { useRef } from 'react'
import { AlertTriangle, ArrowDownCircle, ChevronDown } from 'react-feather'
import { useCloseModal, useModalIsOpen, useOpenModal, useToggleModal } from '../../state/applicationv3/hooks'
import { ApplicationModal } from '../../state/applicationv3/reducer'
import styled from 'styled-components/macro'
import { ExternalLink, MEDIA_WIDTHSV3 } from '../../theme'
// import { isMobile } from 'utils/userAgent'
import { isMobile } from 'react-device-detect'
const Trans = styled.div``
const ActiveRowLinkList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 8px;
  & > a {
    align-items: center;
    color: ${({ theme }) => theme.text2};
    display: flex;
    flex-direction: row;
    font-size: 14px;
    font-weight: 500;
    justify-content: space-between;
    padding: 8px 0 4px;
    text-decoration: none;
  }
  & > a:first-child {
    margin: 0;
    margin-top: 0px;
    padding-top: 10px;
  }
`
const ActiveRowWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg1};
  border-radius: 8px;
  cursor: pointer;
  padding: 8px;
  width: 100%;
`
const FlyoutHeader = styled.div`
  color: ${({ theme }) => theme.text2};
  cursor: default;
  font-weight: 400;
`
const FlyoutMenu = styled.div`
  position: absolute;
  top: 54px;
  width: 272px;
  z-index: 99;
  padding-top: 10px;
  @media screen and (min-width: ${MEDIA_WIDTHSV3.upToSmall}px) {
    top: 40px;
  }
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    top: 60px;
    right: 20px;
    width: auto;
  `};
`
const FlyoutMenuContents = styled.div`
  align-items: flex-start;
  background-color: ${({ theme }) => theme.bg0};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  overflow: auto;
  padding: 16px;
  & > *:not(:last-child) {
    margin-bottom: 12px;
  }
`
const FlyoutRow = styled.div<{ active: boolean }>`
  align-items: center;
  background-color: ${({ active, theme }) => (active ? theme.bg1 : 'transparent')};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  padding: 6px 8px;
  text-align: left;
  width: 100%;
`
const FlyoutRowActiveIndicator = styled.div`
  background-color: ${({ theme }) => theme.green1};
  border-radius: 50%;
  height: 9px;
  width: 9px;
`

const CircleContainer = styled.div`
  width: 20px;
  display: flex;
  justify-content: center;
`

const LinkOutCircle = styled(ArrowDownCircle)`
  transform: rotate(230deg);
  width: 16px;
  height: 16px;
`
const Logo = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 8px;
`
const NetworkLabel = styled.div`
  flex: 1 1 auto;
`
const SelectorLabel = styled(NetworkLabel)`
  display: none;
  @media screen and (min-width: ${MEDIA_WIDTHSV3.upToSmall}px) {
    display: block;
    margin-right: 8px;
  }
`
const NetworkAlertLabel = styled(NetworkLabel)`
  display: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.4rem;
  font-size: 1rem;
  width: fit-content;
  font-weight: 500;
  @media screen and (min-width: ${MEDIA_WIDTHSV3.upToSmall}px) {
    display: block;
  }
`
const SelectorControls = styled.div<{ supportedChain: boolean }>`
  align-items: center;
  background-color: ${({ theme }) => theme.bg0};
  border: 2px solid ${({ theme }) => theme.bg0};
  border-radius: 16px;
  color: ${({ theme }) => theme.text1};
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  padding: 6px 8px;
  ${({ supportedChain, theme }) =>
    !supportedChain &&
    `
    color: ${theme.white};
    background-color: ${theme.red1};
    border: 2px solid ${theme.red1};
  `}
  cursor: default;
  :focus {
    background-color: ${({ theme }) => darken(0.1, theme.red1)};
  }
`
const SelectorLogo = styled(Logo)`
  @media screen and (min-width: ${MEDIA_WIDTHSV3.upToSmall}px) {
    margin-right: 8px;
  }
`
const SelectorWrapper = styled.div`
  @media screen and (min-width: ${MEDIA_WIDTHSV3.upToSmall}px) {
    position: relative;
  }
`
const StyledChevronDown = styled(ChevronDown)`
  width: 16px;
`

const NetworkIcon = styled(AlertTriangle)`
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  width: 16px;
  height: 16px;
`

const BridgeLabel = ({ chainId }: { chainId: SupportedChainId }) => {
  switch (chainId) {
    case SupportedChainId.ARBITRUM_ONE:
    case SupportedChainId.ARBITRUM_RINKEBY:
      return <Trans>Arbitrum Bridge</Trans>
    case SupportedChainId.OPTIMISM:
    case SupportedChainId.OPTIMISTIC_KOVAN:
      return <Trans>Optimism Bridge</Trans>
    case SupportedChainId.POLYGON:
    case SupportedChainId.POLYGON_MUMBAI:
      return <Trans>Polygon Bridge</Trans>
    case SupportedChainId.CELO:
    case SupportedChainId.CELO_ALFAJORES:
      return <Trans>Portal Bridge</Trans>
    default:
      return <Trans>Bridge</Trans>
  }
}
const ExplorerLabel = ({ chainId }: { chainId: SupportedChainId }) => {
  switch (chainId) {
    case SupportedChainId.ARBITRUM_ONE:
    case SupportedChainId.ARBITRUM_RINKEBY:
      return <Trans>Arbiscan</Trans>
    case SupportedChainId.OPTIMISM:
    case SupportedChainId.OPTIMISTIC_KOVAN:
      return <Trans>Optimistic Etherscan</Trans>
    case SupportedChainId.POLYGON:
    case SupportedChainId.POLYGON_MUMBAI:
      return <Trans>Polygonscan</Trans>
    case SupportedChainId.CELO:
    case SupportedChainId.CELO_ALFAJORES:
      return <Trans>Blockscout</Trans>
    case SupportedChainId.BSC:
      return <Trans>BscScan</Trans>
    case SupportedChainId.OKEXCHAIN:
      return <Trans>Oklink</Trans>
    case SupportedChainId.HUOBI:
      return <Trans>Heco Chain Explorer</Trans>
    case SupportedChainId.GNOSIS:
      return <Trans>Gnosis Chain Explorer</Trans>
    case SupportedChainId.AVALANCHE:
      return <Trans>Avalanche Explorer</Trans>
    case SupportedChainId.FANTOM:
      return <Trans>Fantom Blockchain Explorer</Trans>
    case SupportedChainId.KLAYTN:
      return <Trans>Klaytn Explorer</Trans>
    case SupportedChainId.AURORA:
      return <Trans>Aurora Explorer</Trans>
    default:
      return <Trans>Etherscan</Trans>
  }
}

function Row({
  targetChain,
  onSelectChain
}: {
  targetChain: SupportedChainId
  onSelectChain: (targetChain: number) => void
}) {
  const { chainId } = useWeb3React()
  const { library: provider } = useActiveWeb3React()
  if (!provider || !chainId) {
    return null
  }
  const active = chainId === targetChain
  const { helpCenterUrl, explorer, bridge, label, logoUrl } = getChainInfo(targetChain)

  const rowContent = (
    <FlyoutRow onClick={() => onSelectChain(targetChain)} active={active}>
      <Logo src={logoUrl} />
      <NetworkLabel>{label}</NetworkLabel>
      {chainId === targetChain && (
        <CircleContainer>
          <FlyoutRowActiveIndicator />
        </CircleContainer>
      )}
    </FlyoutRow>
  )

  if (active) {
    return (
      <ActiveRowWrapper>
        {rowContent}
        <ActiveRowLinkList>
          {bridge && (
            <ExternalLink href={bridge}>
              <BridgeLabel chainId={chainId} />
              <CircleContainer>
                <LinkOutCircle />
              </CircleContainer>
            </ExternalLink>
          )}
          {explorer && (
            <ExternalLink href={explorer}>
              <ExplorerLabel chainId={chainId} />
              <CircleContainer>
                <LinkOutCircle />
              </CircleContainer>
            </ExternalLink>
          )}
          {helpCenterUrl && (
            <ExternalLink href={helpCenterUrl}>
              <Trans>Help Center</Trans>
              <CircleContainer>
                <LinkOutCircle />
              </CircleContainer>
            </ExternalLink>
          )}
        </ActiveRowLinkList>
      </ActiveRowWrapper>
    )
  }
  return rowContent
}

const NETWORK_SELECTOR_CHAINS = [
  SupportedChainId.MAINNET,
  SupportedChainId.POLYGON,
  SupportedChainId.OPTIMISM,
  // SupportedChainId.ARBITRUM_ONE,
  // SupportedChainId.CELO,
  SupportedChainId.BSC,
  SupportedChainId.OKEXCHAIN,
  SupportedChainId.HUOBI,
  SupportedChainId.GNOSIS,
  SupportedChainId.AVALANCHE,
  SupportedChainId.FANTOM,
  SupportedChainId.KLAYTN,
  SupportedChainId.AURORA
]

export default function NetworkSelector() {
  const { chainId } = useWeb3React()
  const { library: provider } = useActiveWeb3React()
  const node = useRef<HTMLDivElement>(null)
  const isOpen = useModalIsOpen(ApplicationModal.NETWORK_SELECTOR)
  const openModal = useOpenModal(ApplicationModal.NETWORK_SELECTOR)
  const closeModal = useCloseModal(ApplicationModal.NETWORK_SELECTOR)
  const toggleModal = useToggleModal(ApplicationModal.NETWORK_SELECTOR)
  const info = getChainInfo(chainId)

  const selectChain = useSelectChain()
  // useSyncChainQuery()

  if (!chainId || !provider) {
    return null
  }

  const onSupportedChain = info !== undefined

  return (
    <SelectorWrapper
      ref={node}
      onMouseEnter={openModal}
      onMouseLeave={closeModal}
      onClick={isMobile ? toggleModal : undefined}
    >
      <SelectorControls supportedChain={onSupportedChain}>
        {onSupportedChain ? (
          <>
            <SelectorLogo src={info?.logoUrl} />
            <SelectorLabel>{info?.label}</SelectorLabel>
            <StyledChevronDown />
          </>
        ) : (
          <>
            <NetworkIcon />
            <NetworkAlertLabel>Switch Network</NetworkAlertLabel>
            <StyledChevronDown />
          </>
        )}
      </SelectorControls>
      {isOpen && (
        <FlyoutMenu>
          <FlyoutMenuContents>
            <FlyoutHeader>
              <Trans>Select a {!onSupportedChain ? ' supported ' : ''}network</Trans>
            </FlyoutHeader>
            {NETWORK_SELECTOR_CHAINS.map((chainId: SupportedChainId) => (
              <Row
                onSelectChain={async (targetChainId: SupportedChainId) => {
                  // window.alert('Select')
                  await selectChain(targetChainId)
                  closeModal()
                }}
                targetChain={chainId}
                key={chainId}
              />
            ))}
          </FlyoutMenuContents>
        </FlyoutMenu>
      )}
    </SelectorWrapper>
  )
}