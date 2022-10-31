// useContext 组件之间共享状态
import React, { useContext, useMemo } from 'react'
// styled-components是react的一个库，可以用来美化组件，写法依赖于es6，依赖于webpack
import { ThemeContext } from 'styled-components'
import { Pair } from 'eotc-bscswap-sdk'
import { Link } from 'react-router-dom'
import { SwapPoolTabs } from '../../components/NavigationTabs'

import Question from '../../components/QuestionHelper'
import FullPositionCard from '../../components/PositionCard'
import { useUserHasLiquidityInAllTokens } from '../../data/V1'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { StyledInternalLink, TYPE } from '../../theme'
import { Text } from 'rebass'
import { LightCard } from '../../components/Card'
import { RowBetween } from '../../components/Row'
// , ButtonSecondary
import { ButtonPrimary } from '../../components/Button'
import { AutoColumn } from '../../components/Column'

import { useActiveWeb3React } from '../../hooks'
import { usePairs } from '../../data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import AppBody from '../AppBody'
import { Dots } from '../../components/swap/styleds'
import { useTranslation } from 'react-i18next'
// import { CONTRACT } from '../../constants'

export default function Pool() {
  // Context Hook允许我们通过Hook来直接获取某个Context的值
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  // fetch the user's balances of all tracked V2 LP tokens
  // 获取所有跟踪的V2 LP令牌的用户余额
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map(tokens => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map(tpwlt => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens
  ])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  // 获取用户有余额的所有V2池的准备金
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )
  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some(V2Pair => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))
  const hasV1Liquidity = useUserHasLiquidityInAllTokens()

  return (
    <>
      <AppBody>
        <SwapPoolTabs active={'pool'} />
        <AutoColumn gap="lg" justify="center">
          <ButtonPrimary
            id="join-pool-button"
            as={Link}
            style={{ padding: 16 }}
            to="/add/0x55d398326f99059fF775485246999027B3197955/0x52445374E55a63C0De647445D5B6a4244702980C"
          >
            <Text fontWeight={500} fontSize={20}>
              {t('addLiquidity')}
            </Text>
          </ButtonPrimary>

          <AutoColumn gap="12px" style={{ width: '100%' }}>
            <RowBetween padding={'0 8px'}>
              <Text color={theme.text1} fontWeight={500}>
                {t('yourLiquidity')}
              </Text>
              <Question text={t('yourLiquidityQuestion')} />
            </RowBetween>

            {!account ? (
              <LightCard padding="40px">
                <TYPE.body color={theme.text3} textAlign="center">
                  {t('viewLiquidity')}
                </TYPE.body>
              </LightCard>
            ) : v2IsLoading ? (
              <LightCard padding="40px">
                <TYPE.body color={theme.text3} textAlign="center">
                  <Dots>{t('Loading')}</Dots>
                </TYPE.body>
              </LightCard>
            ) : allV2PairsWithLiquidity?.length > 0 ? (
              <>
                {allV2PairsWithLiquidity.map(v2Pair => (
                  <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                ))}
              </>
            ) : (
              <LightCard padding="40px">
                <TYPE.body color={theme.text3} textAlign="center">
                  {t('noLiquidityFound')}
                </TYPE.body>
              </LightCard>
            )}

            <div>
              <Text textAlign="center" fontSize={14} style={{ padding: '.5rem 0 .5rem 0' }}>
                {hasV1Liquidity ? 'Uniswap V1 liquidity found!' : t('noPool')}{' '}
                <StyledInternalLink id="import-pool-link" to={hasV1Liquidity ? '/migrate/v1' : '/find'}>
                  {hasV1Liquidity ? 'Migrate now.' : t('importIt')}
                </StyledInternalLink>
              </Text>
            </div>
          </AutoColumn>
        </AutoColumn>
      </AppBody>

      {/* <div style={{ display: 'flex', alignItems: 'center', marginTop: '1.5rem' }}>
        <ButtonSecondary as={Link} style={{ width: 'initial' }} to="/migrate/v1">
          Migrate V1 Liquidity
        </ButtonSecondary>
      </div> */}
    </>
  )
}
