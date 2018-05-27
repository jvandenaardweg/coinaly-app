import mutations from '@/store/modules/prices/mutations'
import state from '@/store/modules/prices/state'
import initialState from '@/store/modules/prices/initialState'

import mockPrices from '@/mocks/prices.json'
import mockPricesHistory from '@/mocks/prices-history.json'

describe('modules/prices/mutations.js', () => {
  it('addAll adds all prices', () => {
    mutations.addAll(state, mockPrices)
    expect(state.prices).toMatchObject(mockPrices)
  })

  it('addAllHistory adds all prices history', () => {
    mutations.addAllHistory(state, mockPricesHistory)
    expect(state.history).toMatchObject(mockPricesHistory)
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

  it('mutation resetState should set state to its default values', () => {
    mutations.setError(state, 'Some error happened.') // Fill the store with something
    mutations.resetState(state)
    expect(state).toMatchObject(initialState())
  })
})
