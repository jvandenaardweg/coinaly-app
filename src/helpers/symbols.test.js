import { marketSymbolToBaseSymbol, marketSymbolToQuoteSymbol, symbolToName, symbolsToNames, symbolIconLocation } from './symbols'

describe('helpers/symbols.js', () => {
  it('should return the correct base symbol from a market symbol', () => {
    expect(marketSymbolToBaseSymbol('XRP/BTC')).toBe('BTC')
    expect(marketSymbolToBaseSymbol('XRP/ETH')).toBe('ETH')
  })

  it('should return the correct quote symbol from a market symbol', () => {
    expect(marketSymbolToQuoteSymbol('XRP/BTC')).toBe('XRP')
    expect(marketSymbolToQuoteSymbol('XVG/ETH')).toBe('XVG')
  })

  it('should return the correct full name of a currency when using a symbol', () => {
    expect(symbolToName('XRP')).toBe('Ripple')
    expect(symbolToName('XVG')).toBe('Verge')
    expect(symbolToName('UNKNOWNCRYPTO')).toBe(null)
  })

  it('should return a array of cryptocurrency names', () => {
    expect(symbolsToNames('XRP/BTC')).toEqual(expect.arrayContaining(['Ripple', 'Bitcoin']))
    expect(symbolsToNames('XVG/BTC')).toEqual(expect.arrayContaining(['Verge', 'Bitcoin']))
    expect(symbolsToNames('XVG')).toEqual(expect.arrayContaining(['Verge']))
    expect(symbolsToNames('UNKNOWNCRYPTO')).toEqual(expect.arrayContaining([null]))
    expect(symbolsToNames('')).toEqual(null)
  })

  it('should return a correct icon file location', () => {
    expect(symbolIconLocation('XRP')).toBe('/static/icons/cryptocurrencies/svg/color/xrp.svg')
    expect(symbolIconLocation('BTC')).toBe('/static/icons/cryptocurrencies/svg/color/btc.svg')
    expect(symbolIconLocation('IOTA')).toBe('/static/icons/cryptocurrencies/svg/color/miota.svg')
  })
})
