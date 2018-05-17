import mutations from '@/store/modules/balances/mutations'
import state from '@/store/modules/balances/state'
import initialState from '@/store/modules/balances/initialState'

import balancesMock from '@/mocks/balances.json'

describe('modules/balances/mutations.js', () => {
  it('mutation addAll sets all currencies', () => {
    mutations.addAll(state, balancesMock)
    expect(state.balances).toMatchObject(balancesMock)
  })

  it('mutation startLoading sets state.isLoading to true', () => {
    mutations.startLoading(state)
    expect(state.isLoading).toBe(true)
  })

  it('mutation stopLoading sets state.isLoading to false', () => {
    mutations.stopLoading(state)
    expect(state.isLoading).toBe(false)
  })

  it('mutation setError sets state.hasError to true', () => {
    mutations.setError(state)
    expect(state.hasError).toBe(true)
  })

  it('mutation removeError sets state.hasError to false', () => {
    mutations.removeError(state)
    expect(state.hasError).toBe(false)
  })

  it('mutation addServerError sets error message to state.serverError', () => {
    mutations.addServerError(state, 'Example error')
    expect(state.serverError).toBe('Example error')
  })

  it('mutation resetState should set state to its default values', () => {
    mutations.addAll(state, balancesMock)
    mutations.resetState(state)
    expect(state).toMatchObject(initialState())
  })
})
