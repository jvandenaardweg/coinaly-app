import store from '../index'
// import marketMock from '@/mocks/market.json'
import marketsMock from '@/mocks/markets.json'

describe('modules/markets.js', () => {
  beforeEach(() => {
    store.state.markets = {
      markets: {},
      selectedFavorites: [],
      isLoading: true,
      selectedMarket: null,
      priceIndexes: null
    }
    store.commit('markets/addAllMarkets', marketsMock)
  })

  it('getter isLoading should return correct boolean', () => {
    store.commit('markets/startLoading')
    expect(store.getters['markets/isLoading']).toBe(true)

    store.commit('markets/stopLoading')
    expect(store.getters['markets/isLoading']).toBe(false)
  })

  it('getter allMarkets should return all markets', () => {
    expect(store.getters['markets/allMarkets']).toMatchObject(marketsMock)
  })

  it('getter hasMarkets should return correct boolean', () => {
    expect(store.getters['markets/hasMarkets']).toBe(true)

    store.commit('markets/addAllMarkets', {})
    expect(store.getters['markets/hasMarkets']).toBe(false)
  })

  it('getter selectedMarket should return correct market symbol', () => {
    store.commit('markets/setSelectedMarket', 'BTC/USDT')
    expect(store.getters['markets/selectedMarket']).toBe('BTC/USDT')

    store.commit('markets/removeSelectedMarket')
    expect(store.getters['markets/selectedMarket']).toBe(null)
  })

  it('getter allFavoriteMarkets should return all the favorite markets', () => {
    store.commit('markets/setFavoriteMarkets', ['BTC/USDT'])
    expect(Object.keys(store.getters['markets/allFavoriteMarkets'])).toHaveLength(1)
    expect(store.getters['markets/allFavoriteMarkets']['BTC/USDT']).toMatchObject(marketsMock['BTC/USDT'])
  })

  it('getter totalFavoriteMarkets should return all total favorite markets', () => {
    store.commit('markets/setFavoriteMarkets', ['BTC/USDT'])
    expect(store.getters['markets/totalFavoriteMarkets']).toBe(1)
  })

  it('getter hasFavoriteMarkets should return true when there are favorite markets', () => {
    store.commit('markets/setFavoriteMarkets', ['BTC/USDT'])
    expect(store.getters['markets/hasFavoriteMarkets']).toBe(true)
  })

  it('getter hasFavoriteMarkets should return false when there are no favorite markets', () => {
    expect(store.getters['markets/hasFavoriteMarkets']).toBe(false)
  })
})
