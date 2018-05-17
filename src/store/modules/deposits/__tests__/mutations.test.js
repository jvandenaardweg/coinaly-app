import mutations from '@/store/modules/deposits/mutations'
import state from '@/store/modules/deposits/state'
import initialState from '@/store/modules/deposits/initialState'

import depositsAddressMock from '@/mocks/deposits-address.json'

describe('modules/deposits/mutations.js', () => {
  it('mutation addAddress add an deposit address to state.addresses', () => {
    mutations.addAddress(state, depositsAddressMock)
    let expected = {}
    expected[depositsAddressMock.currency] = {
      ...depositsAddressMock
    }
    expect(state.addresses).toMatchObject(expected)
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

  it('mutation setSuccess sets state.success to a string', () => {
    mutations.setSuccess(state, 'This is a success message')
    expect(state.success).toBe('This is a success message')
  })

  it('mutation removeSuccess sets state.success to null', () => {
    mutations.removeSuccess(state)
    expect(state.success).toBe(null)
  })

  it('mutation resetState should set state to its default values', () => {
    mutations.setError(state, 'Some error happened.') // Fill the store with something
    mutations.resetState(state)
    expect(state).toMatchObject(initialState())
  })
})
