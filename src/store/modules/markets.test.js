import store from '../index'

describe('modules/markets.js', () => {
  it('getter isLoading should return correct boolean', () => {
    store.commit('markets/startLoading')
    expect(store.getters['markets/isLoading']).toBe(true)

    store.commit('markets/stopLoading')
    expect(store.getters['markets/isLoading']).toBe(false)
  })

  it('getter allMarkets should return all markets', () => {
    store.commit('markets/addAllMarkets', input)
    expect(store.getters['markets/allMarkets']).toMatchObject(input)
  })

  it('getter hasMarkets should return correct boolean', () => {
    store.commit('markets/addAllMarkets', input)
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

let input = {
  'ADA/BTC': {
    ask: 0.000029,
    baseVolume: 91160949.90594338,
    bid: 0.00002893,
    change: 0.0000026300000000000002,
    close: 0.000029,
    datetime: '2018-04-16T09:25:08.367Z',
    high: 0.00003006,
    info: {},
    last: 0.000029,
    low: 0.000026,
    percentage: 9.973454683352296,
    quoteVolume: 2550.04728807,
    symbol: 'ADA/BTC',
    timestamp: 1523870708367
  },
  'BTC/USDT': {
    ask: 8068,
    baseVolume: 3500.75167604,
    bid: 8045.004,
    change: -60.600000000000364,
    close: 8052.4,
    datetime: '2018-04-16T09:27:10.927Z',
    high: 8421,
    info: {},
    last: 8052.4,
    low: 8000,
    percentage: -0.7469493405645306,
    quoteVolume: 28845577.22005272,
    symbol: 'BTC/USDT',
    timestamp: 1523870845623
  }
}
