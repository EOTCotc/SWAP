import React, { useRef } from 'react'
// import { Info, BookOpen, Code, PieChart, MessageCircle } from 'react-feather'
import styled from 'styled-components'
import { ReactComponent as MenuIcon } from '../../assets/images/menu2.svg'
// import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import useToggle from '../../hooks/useToggle'
import eotcLogo from '../../assets/images/eotclogo.png'
// import { ExternalLink } from '../../theme'
import { useTranslation } from 'react-i18next'

const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.text1};
    fill: ${({ theme }) => theme.text1};
  }
`
// background-color: ${({ theme }) => theme.bg3};
const StyledMenuButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;

  padding: 0.15rem 0.3rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
`

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    position: absolute;
    left: 15px;
    top: 25px;
  `};
`
// min-width: 8.125rem;
//   background-color: ${({ theme }) => theme.bg3};
//   box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
//     0px 24px 32px rgba(0, 0, 0, 0.01);
//   border-radius: 0.5rem;
//   padding: 0.5rem;
//   display: flex;
//   flex-direction: column;
//   font-size: 1rem;
//   position: absolute;
//   top: 3rem;
//   right: 0rem;
//   z-index: 100;#101B39
const MenuFlyout = styled.span`
  position: fixed;
  display: flex;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  left: 0;
  top: 0;
  background-color: ${({ theme }) => theme.bg6};
  flex-direction: column;
`

const MenuTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  line-height: 20px;
`

const MenuClose = styled.div`
  font-size: 34px;
  cursor: pointer;
  color: ${({ theme }) => theme.text1};
`

const MenuItem = styled.a`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text1};
  display: flex;
  margin: 10px;
  font-size: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.bg7};
  padding-bottom: 10px;
  text-decoration: none;
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`

// const CODE_LINK = 'https://github.com/Uniswap/uniswap-interface'

export default function Menu() {
  const node = useRef<HTMLDivElement>()
  const [open, toggle] = useToggle(false)

  useOnClickOutside(node, open ? toggle : undefined)
  const { t } = useTranslation()

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={toggle}>
        <StyledMenuIcon />
      </StyledMenuButton>
      {open && (
        <MenuFlyout>
          <MenuTitle>
            <div>
              {' '}
              <img src={eotcLogo} alt="" style={{ width: '30px', height: '30px' }} />
            </div>
            <MenuClose onClick={toggle}>×</MenuClose>
          </MenuTitle>
          <div>
            <MenuItem href="https://eotc.im/">
              {/* <Info size={14} /> */}
              {t('text22')}
            </MenuItem>
            <MenuItem href="https://fi.eotc.im/">
              {/* <BookOpen size={14} /> */}
              {t('text23')}
            </MenuItem>
            <MenuItem href="https://trx.eotc.im/">
              {/* <MessageCircle size={14} /> */}
              {t('text24')}
            </MenuItem>
            <MenuItem target="_blank" href="#">
              {/* <Code size={14} /> */}
              {t('text25')}
            </MenuItem>
            <MenuItem href="#">
              {/* <MessageCircle size={14} /> */}
              {t('text26')}
            </MenuItem>
            <MenuItem href="https://did.eotc.im">
              {/* <PieChart size={14} /> */}
              {t('text27')}
            </MenuItem>
            <MenuItem href="#">
              {/* <PieChart size={14} /> */}
              {t('text28')}
            </MenuItem>
            <MenuItem href="https://nft.eotc.im/">
              {/* <PieChart size={14} /> */}
              EOTC NFT
            </MenuItem>
            <MenuItem href="#">
              {/* <PieChart size={14} /> */}
              {t('text29')}
            </MenuItem>
            <MenuItem href="https://dao.eotc.im">
              {/* <PieChart size={14} /> */}
              EOTC DAO
            </MenuItem>
          </div>
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
