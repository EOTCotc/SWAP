import { Currency, Token } from 'eotc-bscswap-sdk'

export function currencyId(currency: Currency): string {
  // if (currency === Currency.ETHER) return 'BNB'
  if (currency === Currency.ETHER) return 'ETH'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
