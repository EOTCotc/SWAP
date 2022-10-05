import styled, { keyframes } from 'styled-components'
import { ButtonPrimary } from '../../components/Button'
import { RowBetween } from '../../components/Row'
export const Box = styled.div<{ mt?: string; pr?: string; mb?: string }>`
  margin-top: ${({ mt }) => mt && mt};
  margin-bottom: ${({ mb }) => mb && mb};
  padding-right: ${({ pr }) => pr && pr};
`
export const BodyMining = styled.div`
  position: relative;
  max-width: 420px;
  width: 100%;
  background: ${({ theme }) => theme.color1};
  border-radius: 10px 10px 10px 10px;
  padding: 1.25rem 0.9375rem;
`
export const MaxButton = styled.div`
  padding: 0.3125rem 1rem;
  width: auto;
  border-radius: 20px 20px 20px 20px;
  border: 1px solid #7b7d8a;
  background-color: initial;
`
export const BoxSB = styled(RowBetween)`
  width: auto;
`
export const BoxInput = styled.div`
  background: ${({ theme }) => theme.bg1};
  border-radius: 10px 10px 10px 10px;
  padding: 20px 14px;
  & input {
    background: ${({ theme }) => theme.bg1} !important;
    text-align: left;
    font-weight: 400;
    color: #484b53;
    font-size: 14px;
  }
`
export const OrderCard = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.bg9};
  border-radius: 10px;
  padding: 0.93rem;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.08);
`
export const ButtonUnStake = styled(ButtonPrimary)`
  padding: 0.6875rem 0;
  min-width: 8.4375rem;
`
export const RecordLogo = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`
export const loadingAnimation = keyframes`
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`
export const LoadingRows = styled.div`
  display: grid;

  & > div {
    animation: ${loadingAnimation} 1.5s infinite;
    animation-fill-mode: both;
    background: linear-gradient(
      to left,
      ${({ theme }) => theme.bg1} 25%,
      ${({ theme }) => theme.bg2} 50%,
      ${({ theme }) => theme.bg1} 75%
    );
    background-size: 400%;
    border-radius: 8px;
    height: 2.4em;
    will-change: background-position;
  }
`
