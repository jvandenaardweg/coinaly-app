import store from '../index'

describe('modules/tickers.js', () => {
  it('getter allTickers should return a single ticker', () => {
    store.commit('tickers/setTicker', singleTicker)
    expect(store.getters['tickers/allTickers']).toMatchObject(singleTicker)
  })

  it('getter allTickers should return multiple tickers', () => {
    store.commit('tickers/setTickers', input)
    expect(store.getters['tickers/allTickers']).toMatchObject(input)
    expect(store.getters['tickers/allTickers']['ADA/BTC']).toMatchObject(input['ADA/BTC'])
    expect(store.getters['tickers/allTickers']['BTC/USDT']).toMatchObject(input['BTC/USDT'])
  })
})

let singleTicker = {
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
  }
}

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
