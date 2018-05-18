import mutations from '@/store/modules/markets/mutations'
import state from '@/store/modules/markets/state'
import initialState from '@/store/modules/markets/initialState'

import marketsMock from '@/mocks/markets.json'
import marketsOHLCV1dMock from '@/mocks/markets-ohlcv-1d.json'

describe('modules/markets/mutations.js', () => {
  it('mutation addAll add an array of keys to state.keys', () => {
    mutations.addAll(state, marketsMock)
    expect(state.markets).toMatchObject(marketsMock)
  })

  it('mutation startLoading sets state.isLoading to true', () => {
    mutations.startLoading(state)
    expect(state.isLoading).toBe(true)
  })

  it('mutation stopLoading sets state.isLoading to false', () => {
    mutations.stopLoading(state)
    expect(state.isLoading).toBe(false)
  })

  it('mutation setError sets state.error', () => {
    mutations.setError(state, 'Some error happened.')
    expect(state.error).toBe('Some error happened.')
  })

  it('mutation removeError sets state.error to null', () => {
    mutations.removeError(state)
    expect(state.error).toBe(null)
  })

  it('mutation addFavorites sets state.favorites to an array of market symbols', () => {
    const exampleFavorites = ['BTC/USDT', 'XRP/BTC', 'LTC/BTC']
    mutations.addFavorites(state, exampleFavorites)
    expect(state.favorites).toBe(exampleFavorites)
  })

  it('mutation resetState should set state to its default values', () => {
    mutations.setError(state, 'Some error happened.') // Fill the store with something
    mutations.resetState(state)
    expect(state).toMatchObject(initialState())
  })

  it('mutation addOHLCV should set state.ohlcv with a market ohlcv data array', () => {
    const payload = {
      marketSymbol: 'BTC/USDT',
      interval: '1d',
      data: marketsOHLCV1dMock
    }
    mutations.addOHLCV(state, payload)
    expect(state.ohlcv[payload.marketSymbol]).toMatchObject(payload.data)
  })
})
