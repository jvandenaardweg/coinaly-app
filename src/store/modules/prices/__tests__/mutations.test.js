import mutations from '@/store/modules/prices/mutations'
import state from '@/store/modules/prices/state'

import mockPrices from '@/mocks/prices.json'

describe('modules/prices/mutations.js', () => {
  it('addAll adds all prices', () => {
    mutations.addAll(state, mockPrices)
    expect(state.prices).toMatchObject(mockPrices)
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
})
