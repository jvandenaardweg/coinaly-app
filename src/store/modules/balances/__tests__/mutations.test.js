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

  it('mutation setError sets state.error to a message', () => {
    mutations.setError(state, 'An error happened')
    expect(state.error).toBe('An error happened')
  })
  it('mutation removeError sets state.error to null', () => {
    state.error = 'Some error message'
    mutations.removeError(state)
    expect(state.error).toBe(null)
  })

  it('mutation resetState should set state to its default values', () => {
    mutations.addAll(state, balancesMock)
    mutations.resetState(state)
    expect(state).toMatchObject(initialState())
  })
})
