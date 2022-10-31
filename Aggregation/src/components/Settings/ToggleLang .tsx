import React from 'react'
import styled from 'styled-components/macro'
import { MEDIA_WIDTHSV3 } from '../../theme'
import i18n, { LangOptions } from '../../i18n'
const FlyoutHeader = styled.div`
  color: ${({ theme }) => theme.text2};
  cursor: default;
  font-weight: 400;
`
const FlyoutMenu = styled.div`
  /* position: absolute; */
  /* top: 54px; */
  /* width: 272px; */
  z-index: 99;
  @media screen and (min-width: ${MEDIA_WIDTHSV3.upToSmall}px) {
    /* top: 40px; */
  }
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    top: 60px;
    right: 20px;
    width: auto;
  `};
`
const FlyoutMenuContents = styled.div`
  align-items: flex-start;
  /* background-color: ${({ theme }) => theme.bg0}; */
  /* box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01); */
  /* border-radius: 20px; */
  display: flex;
  flex-direction: column;
  font-size: 16px;
  overflow: auto;
  /* padding: 16px; */
  & > *:not(:last-child) {
    margin-bottom: 12px;
  }
`
const FlyoutRow = styled.div<{ active: boolean }>`
  align-items: center;
  background-color: ${({ active, theme }) => (active ? theme.bg14 : 'transparent')};
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  padding: 8px 12px;
  text-align: left;
  width: 100%;
  :hover {
    background-color: ${({ theme }) => theme.bg14};
    transition: background-color 125ms ease-in 0s;
  }
`

const NetworkLabel = styled.div`
  flex: 1 1 auto;
`

function Row({ item, language, setLanguage }: { item: any; language: string; setLanguage: any }) {
  const active = language === item.value
  console.log(active, 'active')

  const rowContent = (
    <FlyoutRow
      onClick={() => {
        setLanguage(item.value)
        i18n.changeLanguage(item.value)
      }}
      active={active}
    >
      <NetworkLabel>{item.label}</NetworkLabel>
    </FlyoutRow>
  )

  return rowContent
}

export default function ToggleLang({ language, setLanguage }: { language: string; setLanguage: any }) {
  return (
    <FlyoutMenu>
      <FlyoutMenuContents>
        <FlyoutHeader></FlyoutHeader>
        {LangOptions.map(item => (
          <Row setLanguage={setLanguage} language={language} item={item} key={item.value} />
        ))}
      </FlyoutMenuContents>
    </FlyoutMenu>
  )
}
