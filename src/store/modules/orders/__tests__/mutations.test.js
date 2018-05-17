import mutations from '@/store/modules/orders/mutations'
import state from '@/store/modules/orders/state'
import initialState from '@/store/modules/orders/initialState'

import mockOrdersClosed from '@/mocks/orders-closed.json'

describe('modules/orders/mutations.js', () => {
  it('addAllClosed adds all closed orders', () => {
    mutations.addAllClosed(state, mockOrdersClosed)
    expect(state.closed).toMatchObject(mockOrdersClosed)
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
