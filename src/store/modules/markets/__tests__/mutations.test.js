import mutations from '@/store/modules/markets/mutations'
import state from '@/store/modules/markets/state'

import marketsMock from '@/mocks/markets.json'

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
})
