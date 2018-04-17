import store from '../index'
// const marketMock = require('../../mocks/market.json')
const marketsMock = require('../../mocks/markets.json')

describe('modules/markets.js', () => {
  it('getter isLoading should return correct boolean', () => {
    store.commit('markets/startLoading')
    expect(store.getters['markets/isLoading']).toBe(true)

    store.commit('markets/stopLoading')
    expect(store.getters['markets/isLoading']).toBe(false)
  })

  it('getter allMarkets should return all markets', () => {
    store.commit('markets/addAllMarkets', marketsMock)
    expect(store.getters['markets/allMarkets']).toMatchObject(marketsMock)
  })

  it('getter hasMarkets should return correct boolean', () => {
    store.commit('markets/addAllMarkets', marketsMock)
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
})
