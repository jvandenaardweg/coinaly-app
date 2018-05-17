import mutations from '@/store/modules/keys/mutations'
import state from '@/store/modules/keys/state'
import initialState from '@/store/modules/keys/initialState'

import keysMock from '@/mocks/keys.json'

describe('modules/keys/mutations.js', () => {
  it('mutation addAll add an array of keys to state.keys', () => {
    mutations.addAll(state, keysMock)
    expect(state.keys).toMatchObject(keysMock)
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
