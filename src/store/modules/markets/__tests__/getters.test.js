import getters from '@/store/modules/markets/getters'
import state from '@/store/modules/markets/state'
import mutations from '@/store/modules/markets/mutations'

import stateBalances from '@/store/modules/balances/state'
import gettersBalances from '@/store/modules/balances/getters'

import marketsMock from '@/mocks/markets.json'
import balancesMock from '@/mocks/balances.json'
import marketsOHLCV1dMock from '@/mocks/markets-ohlcv-1d.json'

describe('modules/markets/getters.js', () => {
  it('getter isLoading should return true when state.isLoading is true', () => {
    state.isLoading = true
    expect(getters.isLoading(state)).toBe(true)
  })

  it('getter isLoading should return false when state.isLoading is false', () => {
    state.isLoading = false
    expect(getters.isLoading(state)).toBe(false)
  })

  it('getter error should return a error message if state.error is set', () => {
    state.error = 'Sample error message'
    expect(getters.error(state)).toBe('Sample error message')
  })

  it('getter allMarkets should return an array of objects if state.markets is set', () => {
    state.markets = marketsMock
    expect(getters.allMarkets(state)).toMatchObject(marketsMock)
  })

  it('getter allFavoriteMarkets should return an object of markets if state.favorites is set', () => {
    const exampleFavorites = ['BTC/USDT', 'ADA/BTC']
    state.favorites = exampleFavorites
    expect(typeof getters.allFavoriteMarkets(state)).toBe('object')
    expect(getters.allFavoriteMarkets(state)['BTC/USDT']).toMatchObject(marketsMock['BTC/USDT'])
    expect(getters.allFavoriteMarkets(state)['ADA/BTC']).toMatchObject(marketsMock['ADA/BTC'])
  })

  it('getter totalFavoriteMarkets should return the number of market symbols in state.favorites', () => {
    const exampleFavorites = ['BTC/USDT', 'LTC/BTC']
    state.favorites = exampleFavorites
    expect(getters.totalFavoriteMarkets(state)).toBe(2)
    state.favorites = null
    expect(getters.totalFavoriteMarkets(state)).toBe(0)
  })

  it('getter hasFavoriteMarkets should return true if state.favorites has market symbols', () => {
    const exampleFavorites = ['BTC/USDT', 'LTC/BTC']
    state.favorites = exampleFavorites
    expect(getters.hasFavoriteMarkets(state)).toBe(true)
    state.favorites = null
    expect(getters.hasFavoriteMarkets(state)).toBe(false)
  })

  // TODO: below
  // it('getter isFavoriteMarket should return true if state.favorites has market symbols', () => {
  // })

  it('getter allQuoteMarkets should return an object of quote market symbols containing an arrays of baseId\'s if state.markets is set', () => {
    state.markets = marketsMock
    const expected = {
      'BTC': ['ADA'],
      'USDT': ['BTC']
    }
    expect(getters.allQuoteMarkets(state)).toMatchObject(expected)
  })

  it('getter allBaseMarkets should return an object of base market symbols containing an array of quoteId\'s if state.markets is set', () => {
    state.markets = marketsMock
    const expected = {
      'ADA': ['BTC'],
      'BTC': ['USDT']
    }
    expect(getters.allBaseMarkets(state)).toMatchObject(expected)
  })

  it('getter hasMarkets should return true/false when state.markets has or has no items', () => {
    state.markets = marketsMock
    expect(getters.hasMarkets(state)).toBe(true)
    state.markets = null
    expect(getters.hasMarkets(state)).toBe(false)
  })

  it('getter totalMarkets should return the total number of markets if state.markets is set', () => {
    state.markets = marketsMock
    expect(getters.totalMarkets(state)).toBe(2)
  })

  it('getter unavailableBaseMarkets should return the base market symbols which the user cannot buy', () => {
    const rootStateMock = {}

    state.markets = marketsMock
    stateBalances.balances = balancesMock

    const rootGettersMock = {'balances/allFilledBalances': gettersBalances.allFilledBalances(stateBalances)}
    const gettersMock = {'allBaseMarkets': getters.allBaseMarkets(state)}

    const expectedBalance = {'BTC': {'free': 2, 'total': 2, 'used': 0}}
    const expectedUnavailableBaseMarkets = {'BTC': ['USDT']}

    expect(gettersBalances.allFilledBalances(stateBalances)).toMatchObject(expectedBalance)
    expect(getters.unavailableBaseMarkets(state, gettersMock, rootStateMock, rootGettersMock)).toMatchObject(expectedUnavailableBaseMarkets)
  })

  it('getter availableBasemarkets should return the base market symbols which the user can buy', () => {
    const rootStateMock = {}

    state.markets = marketsMock
    stateBalances.balances = balancesMock

    const rootGettersMock = {'balances/allFilledBalances': gettersBalances.allFilledBalances(stateBalances)}
    const gettersMock = {'allBaseMarkets': getters.allBaseMarkets(state)}

    const expectedBalance = {'BTC': {'free': 2, 'total': 2, 'used': 0}}
    const expectedAvailableBaseMarkets = {'ADA': ['BTC']}

    expect(gettersBalances.allFilledBalances(stateBalances)).toMatchObject(expectedBalance)
    expect(getters.availableBaseMarkets(state, gettersMock, rootStateMock, rootGettersMock)).toMatchObject(expectedAvailableBaseMarkets)
  })

  it('getter availableQuoteMarkets should return the quote market symbols which the user can buy/sell', () => {
    const rootStateMock = {}

    state.markets = marketsMock
    stateBalances.balances = balancesMock

    const rootGettersMock = {'balances/allFilledBalances': gettersBalances.allFilledBalances(stateBalances)}
    const gettersMock = {'allQuoteMarkets': getters.allQuoteMarkets(state)}

    const expectedBalance = {'BTC': {'free': 2, 'total': 2, 'used': 0}}
    const expectedAvailableQuoteMarkets = {'BTC': ['ADA']}

    expect(gettersBalances.allFilledBalances(stateBalances)).toMatchObject(expectedBalance)
    expect(getters.availableQuoteMarkets(state, gettersMock, rootStateMock, rootGettersMock)).toMatchObject(expectedAvailableQuoteMarkets)
  })

  it('getter getMarketBySymbol should return the market from a given symbol', () => {
    state.markets = marketsMock
    expect(getters.getMarketBySymbol(state)('BTC/USDT')).toMatchObject(marketsMock['BTC/USDT'])
  })

  it('getter getBaseMarketsBySymbolId should return the base markets from a given symbol', () => {
    state.markets = marketsMock
    const expected = {
      'ADA/BTC': marketsMock['ADA/BTC']
    }
    expect(getters.getBaseMarketsBySymbolId(state)('BTC')).toMatchObject(expected)
  })

  it('getter getQuoteMarketsBySymbolId should return the quote markets from a given symbol', () => {
    state.markets = marketsMock
    const expected = {
      'BTC/USDT': marketsMock['BTC/USDT']
    }
    expect(getters.getBaseMarketsBySymbolId(state)('USDT')).toMatchObject(expected)
  })

  it('getter allMarketSymbols should return an array of all market symbols', () => {
    state.markets = marketsMock
    getters.allBaseMarkets = getters.allBaseMarkets(state)
    getters.allQuoteMarkets = getters.allQuoteMarkets(state)
    expect(getters.allMarketSymbols(state, getters)).toEqual(expect.arrayContaining(['ADA', 'BTC', 'USDT']))
  })

  it('getter totalMarketSymbols should return the total market symbols from the allMarketSymbols getter', () => {
    state.markets = marketsMock
    // getters.allBaseMarkets = getters.allBaseMarkets(state)
    // getters.allQuoteMarkets = getters.allQuoteMarkets(state)
    getters.allMarketSymbols = getters.allMarketSymbols(state, getters)
    expect(getters.totalMarketSymbols(state, getters)).toBe(3)
  })

  it('getter ohlcv should return the ohlcv data per market', () => {
    const payload = {
      marketSymbol: 'BTC/USDT',
      interval: '1d',
      data: marketsOHLCV1dMock
    }
    mutations.addOHLCV(state, payload)

    const expected = {
      [payload.marketSymbol]: marketsOHLCV1dMock
    }

    expect(getters.ohlcv(state)).toMatchObject(expected)
  })
})
