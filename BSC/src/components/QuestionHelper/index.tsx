import React, { useCallback, useState } from 'react'
import { HelpCircle as Question } from 'react-feather'
import styled from 'styled-components'
import lpimg from '../../assets/images/lp.png'
import Tooltip, { TooltipLp } from '../Tooltip'

const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border: none;
  background: none;
  outline: none;
  cursor: default;
  border-radius: 36px;
  background-color: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text2};

  :hover,
  :focus {
    opacity: 0.7;
  }
`
const Lpimg = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`
export default function QuestionHelper({ text }: { text: string }) {
  const [show, setShow] = useState<boolean>(false)

  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])

  return (
    <span style={{ marginLeft: 4 }}>
      <Tooltip text={text} show={show}>
        <QuestionWrapper onClick={open} onMouseEnter={open} onMouseLeave={close}>
          <Question size={16} />
        </QuestionWrapper>
      </Tooltip>
    </span>
  )
}
export function LpHelper({ text }: { text: any }) {
  const [show, setShow] = useState<boolean>(false)

  const open = useCallback(
    e => {
      e.stopPropagation()
      setShow(true)
    },
    [setShow]
  )
  const close = useCallback(() => setShow(false), [setShow])

  return (
    <span style={{ marginLeft: 4 }}>
      <TooltipLp text={text} show={show}>
        <QuestionWrapper onClick={open} onMouseEnter={open} onMouseLeave={close}>
          <Lpimg src={lpimg} />
        </QuestionWrapper>
      </TooltipLp>
    </span>
  )
}
