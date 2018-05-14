import getters from '@/store/modules/markets/getters'
import state from '@/store/modules/markets/state'

import marketsMock from '@/mocks/markets.json'

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

  it('getter allQuoteMarkets should return an object of quote market symbols if state.markets is set', () => {
    state.markets = marketsMock
    const expected = {
      'BTC': 1,
      'USDT': 1
    }
    expect(getters.allQuoteMarkets(state)).toMatchObject(expected)
  })

  it('getter allBaseMarkets should return an object of base market symbols if state.markets is set', () => {
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

})
