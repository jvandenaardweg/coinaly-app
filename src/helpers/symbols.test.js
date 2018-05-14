import { marketSymbolToBaseSymbol, marketSymbolToQuoteSymbol } from './symbols'

describe('helpers/symbols.js', () => {
  it('should return the correct base symbol from a market symbol', () => {
    expect(marketSymbolToBaseSymbol('XRP/BTC')).toBe('BTC')
    expect(marketSymbolToBaseSymbol('XRP/ETH')).toBe('ETH')
  })

  it('should return the correct quote symbol from a market symbol', () => {
    expect(marketSymbolToQuoteSymbol('XRP/BTC')).toBe('XRP')
    expect(marketSymbolToQuoteSymbol('XVG/ETH')).toBe('XVG')
  })
})
