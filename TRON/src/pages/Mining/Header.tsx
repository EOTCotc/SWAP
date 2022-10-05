import React /*{ useContext }*/ from 'react'
import { MiningTabs } from '../../components/NavigationTabs'
import { RowBetween } from '../../components/Row'
// import styled from 'styled-components'
import { LpTag } from './index'

export default function Header({ active }: { active: 'stake' | 'unstake' }) {
  return (
    <RowBetween style={{ marginBottom: '20px', marginTop: '9px' }}>
      <MiningTabs active={active} />
      <LpTag></LpTag>
    </RowBetween>
  )
}
