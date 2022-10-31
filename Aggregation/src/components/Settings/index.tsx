import React, { useRef, useContext, useState, useEffect } from 'react'
import { Settings, X } from 'react-feather'
import styled from 'styled-components'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { LangOptions } from '../../i18n'
import {
  useUserSlippageTolerance,
  useExpertModeManager,
  useUserDeadline,
  useDarkModeManager
} from '../../state/user/hooks'
import TransactionSettings from '../TransactionSettings'
import { RowFixed, RowBetween } from '../Row'
import { TYPE } from '../../theme'
import QuestionHelper from '../QuestionHelper'
import Toggle from '../Toggle'
import { ThemeContext } from 'styled-components'
import { AutoColumn } from '../Column'
import { ButtonError } from '../Button'
import { useSettingsMenuOpen, useToggleSettingsMenu } from '../../state/application/hooks'
import { Text } from 'rebass'
import Modal from '../Modal'
import ToggleLang from './ToggleLang '
import { ChevronRight } from 'react-feather'
import { useTranslation } from 'react-i18next'
const StyledMenuIcon = styled(Settings)`
  height: 22px;
  width: 22px;

  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`

const StyledCloseIcon = styled(X)`
  height: 20px;
  width: 20px;
  :hover {
    cursor: pointer;
  }

  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`
// background-color: ${({ theme }) => theme.bg3};
const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;

  padding: 0.15rem 0.5rem;
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
const EmojiWrapper = styled.div`
  position: absolute;
  bottom: -6px;
  right: 0px;
  font-size: 14px;
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
    // position: absolute;
    // top: 28px;
    // right: 20px;
  `};
`

const MenuFlyout = styled.span`
  min-width: 20.125rem;
  background-color: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);

  border: 1px solid ${({ theme }) => theme.bg3};

  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 3rem;
  right: 0rem;
  z-index: 100;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    min-width: 18.125rem;
    right: 0px;
  `};
`

const Break = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.bg3};
`

const ModalContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 20px;
`
const StyledChevronRight = styled(ChevronRight)`
  width: 16px;
`
export default function SettingsTab() {
  const { t } = useTranslation()
  const node = useRef<HTMLDivElement>()
  const open = useSettingsMenuOpen()
  const toggle = useToggleSettingsMenu()
  const [isOpen, setModal] = useState(false)
  const openModal = () => {
    setModal(true)
    open ? toggle() : undefined
  }
  // const toggleModal = () => setModal(!isOpen)

  const theme = useContext(ThemeContext)
  const [userSlippageTolerance, setUserslippageTolerance] = useUserSlippageTolerance()

  const [deadline, setDeadline] = useUserDeadline()

  const [expertMode, toggleExpertMode] = useExpertModeManager()

  const [darkMode, toggleDarkMode] = useDarkModeManager()

  // show confirmation view before turning on
  const [showConfirmation, setShowConfirmation] = useState(false)

  useOnClickOutside(
    node,
    open
      ? () => {
          toggle()
          isOpen ? setModal(false) : undefined
          // toggleModal()
        }
      : undefined
  )
  useOnClickOutside(
    node,
    isOpen
      ? () => {
          // toggle()
          // toggleModal()
          setModal(false)
        }
      : undefined
  )
  const [language, setLanguage] = useState('zh-CN')
  useEffect(() => {
    const type = localStorage.getItem('i18nextLng')
    if (type) {
      setLanguage(type)
    } else {
      //如果被清空了 那么当前语言会被设置为默认语言 zh-C
    }
  }, [])

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <Modal isOpen={showConfirmation} onDismiss={() => setShowConfirmation(false)} maxHeight={100}>
        <ModalContentWrapper>
          <AutoColumn gap="lg">
            <RowBetween style={{ padding: '0 2rem' }}>
              <div />
              <Text fontWeight={500} fontSize={20}>
                {t('text11')}
              </Text>
              <StyledCloseIcon onClick={() => setShowConfirmation(false)} />
            </RowBetween>
            <Break />
            <AutoColumn gap="lg" style={{ padding: '0 2rem' }}>
              <Text fontWeight={500} fontSize={20}>
                {t('text12')}
              </Text>
              <Text fontWeight={600} fontSize={20}>
                {t('text13')}
              </Text>
              <ButtonError
                error={true}
                padding={'12px'}
                onClick={() => {
                  if (window.prompt(`请输入 "confirm" 一词以启用专家模式。`) === 'confirm') {
                    toggleExpertMode()
                    setShowConfirmation(false)
                  }
                }}
              >
                <Text fontSize={20} fontWeight={500} id="confirm-expert-mode">
                  {t('openExpertMode')}
                </Text>
              </ButtonError>
            </AutoColumn>
          </AutoColumn>
        </ModalContentWrapper>
      </Modal>
      <StyledMenuButton
        onClick={() => {
          toggle()
          isOpen ? setModal(false) : undefined
        }}
        id="open-settings-dialog-button"
      >
        <StyledMenuIcon />
        {expertMode && (
          <EmojiWrapper>
            <span role="img" aria-label="wizard-icon">
              🧙
            </span>
          </EmojiWrapper>
        )}
      </StyledMenuButton>
      {open && (
        <MenuFlyout>
          <AutoColumn gap="md" style={{ padding: '1rem' }}>
            <Text fontWeight={600} fontSize={14}>
              {t('advancedSettings')}
            </Text>
            <TransactionSettings
              rawSlippage={userSlippageTolerance}
              setRawSlippage={setUserslippageTolerance}
              deadline={deadline}
              setDeadline={setDeadline}
            />
            <Text fontWeight={600} fontSize={14}>
              {t('interfaceSettings')}
            </Text>
            <RowBetween>
              <RowFixed>
                <TYPE.black fontWeight={400} fontSize={14} color={theme.text2}>
                  {t('toggleExpertMode')}
                </TYPE.black>
                <QuestionHelper text={t('expertModeQuestionHelper')} />
              </RowFixed>
              <Toggle
                id="toggle-expert-mode-button"
                isActive={expertMode}
                toggle={
                  expertMode
                    ? () => {
                        toggleExpertMode()
                        setShowConfirmation(false)
                      }
                    : () => {
                        toggle()
                        setModal(false)
                        setShowConfirmation(true)
                      }
                }
              />
            </RowBetween>
            <RowBetween>
              <RowFixed>
                <TYPE.black fontWeight={400} fontSize={14} color={theme.text2}>
                  {t('toggleDarkMode')}
                </TYPE.black>
              </RowFixed>
              <Toggle isActive={darkMode} toggle={toggleDarkMode} />
            </RowBetween>
            <RowBetween>
              <RowFixed>
                <TYPE.black fontWeight={400} fontSize={14} color={theme.text2}>
                  {t('language')}
                </TYPE.black>
              </RowFixed>
              {/* <ToggleLang /> */}
              <div style={{ display: 'flex', cursor: 'pointer' }} onClick={openModal}>
                <TYPE.black
                  style={{ display: 'flex', alignItems: 'center' }}
                  fontWeight={400}
                  fontSize={14}
                  color={theme.text2}
                >
                  {LangOptions.find(item => item.value === language)?.label}
                </TYPE.black>
                <StyledChevronRight />
              </div>

              {/* <Toggle isActive={darkMode} toggle={toggleDarkMode} /> */}
            </RowBetween>
          </AutoColumn>
        </MenuFlyout>
      )}
      {isOpen && (
        <MenuFlyout>
          <AutoColumn gap="md" style={{ padding: '1rem' }}>
            <Text fontWeight={600} fontSize={18}>
              {t('selectLanguage')}
            </Text>
            <ToggleLang language={language} setLanguage={setLanguage} />
          </AutoColumn>
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
