import store from '../index'
const tickerMock = require('../../mocks/ticker.json')
const tickersMock = require('../../mocks/tickers.json')

describe('modules/tickers.js', () => {
  it('getter allTickers should return a single ticker', () => {
    store.commit('tickers/setTicker', tickerMock)
    expect(store.getters['tickers/allTickers']).toMatchObject(tickerMock)
  })

  it('getter allTickers should return multiple tickers', () => {
    store.commit('tickers/setTickers', tickersMock)
    expect(store.getters['tickers/allTickers']).toMatchObject(tickersMock)
    expect(store.getters['tickers/allTickers']['ADA/BTC']).toMatchObject(tickersMock['ADA/BTC'])
    expect(store.getters['tickers/allTickers']['BTC/USDT']).toMatchObject(tickersMock['BTC/USDT'])
  })
})
