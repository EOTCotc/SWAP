import { Currency, ETHER, Token } from 'eotc-bscswap-sdk'

export function currencyId(currency: Currency): string {
  // if (currency === ETHER) return 'BNB'
  if (currency === ETHER) return 'ETH'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
