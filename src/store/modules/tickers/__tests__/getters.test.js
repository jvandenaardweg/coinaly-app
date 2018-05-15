import getters from '@/store/modules/tickers/getters'
import state from '@/store/modules/tickers/state'

const tickerMock = require('@/mocks/ticker.json')
const tickersMock = require('@/mocks/tickers.json')

describe('modules/tickers/getters.js', () => {
  it('getter allTickers should return a single ticker', () => {
    state.tickers = tickerMock
    expect(getters.allTickers(state)).toMatchObject(tickerMock)
  })

  it('getter allTickers should return multiple tickers', () => {
    state.tickers = tickersMock
    expect(getters.allTickers(state)).toMatchObject(tickersMock)
    expect(getters.allTickers(state)['ADA/BTC']).toMatchObject(tickersMock['ADA/BTC'])
    expect(getters.allTickers(state)['BTC/USDT']).toMatchObject(tickersMock['BTC/USDT'])
  })

  it('getter isLoading should return true when loading', () => {
    state.isLoading = true
    expect(getters.isLoading(state)).toBe(true)
  })

  it('getter isLoading should return false when not loading', () => {
    state.isLoading = false
    expect(getters.isLoading(state)).toBe(false)
  })

  it('getter getTickerBySymbol should return the ticker from a given symbol', () => {
    state.tickers = tickerMock
    expect(getters.getTickerBySymbol(state)('BTC/USDT')).toMatchObject(tickerMock['BTC/USDT'])
  })
})
