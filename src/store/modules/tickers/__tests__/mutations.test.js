import mutations from '@/store/modules/tickers/mutations'
import state from '@/store/modules/tickers/state'

const tickerMock = require('@/mocks/ticker.json')
const tickersMock = require('@/mocks/tickers.json')

describe('modules/tickers/mutations.js', () => {
  it('setTicker sets tickers to a single ticker', () => {
    mutations.setTicker(state, tickerMock)
    expect(state.tickers).toMatchObject(tickerMock)
  })

  it('setTickers sets multiple tickers', () => {
    mutations.setTickers(state, tickersMock)
    expect(state.tickers).toMatchObject(tickersMock)
  })
  it('mutation startLoading should set isLoading to true', () => {
    mutations.startLoading(state)
    expect(state.isLoading).toBe(true)
  })

  it('mutation stopLoading should set isLoading to false', () => {
    mutations.stopLoading(state)
    expect(state.isLoading).toBe(false)
  })
})
