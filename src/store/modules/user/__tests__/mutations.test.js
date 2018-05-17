import mutations from '@/store/modules/user/mutations'
import state from '@/store/modules/user/state'
import initialState from '@/store/modules/user/initialState'

import mockAuthLogin from '@/mocks/auth-login.json'

describe('modules/user/mutations.js', () => {
  it('setOffline sets state.isOnline to false', () => {
    mutations.setOffline(state)
    expect(state.isOnline).toBe(false)
  })
  it('setOnline sets state.isOnline to true', () => {
    mutations.setOnline(state)
    expect(state.isOnline).toBe(true)
  })
  it('setUser sets state.user to an object', () => {
    mutations.setUser(state, mockAuthLogin.user)
    expect(state.user).toMatchObject(mockAuthLogin.user)
  })
  it('startLoading sets state.isLoading to true', () => {
    state.isLoading = false
    mutations.startLoading(state)
    expect(state.isLoading).toBe(true)
  })
  it('stopLoading sets state.isLoading to false', () => {
    state.isLoading = true
    mutations.stopLoading(state)
    expect(state.isLoading).toBe(false)
  })
  it('setError sets state.error to a message', () => {
    mutations.setError(state, 'An error happened')
    expect(state.error).toBe('An error happened')
  })
  it('removeError sets state.error to null', () => {
    state.error = 'Some error message'
    mutations.removeError(state)
    expect(state.error).toBe(null)
  })
  it('setSuccess sets state.success to a message', () => {
    mutations.setSuccess(state, 'This happened successfully!')
    expect(state.success).toBe('This happened successfully!')
  })
  it('removeSuccess sets state.success to null', () => {
    state.success = 'Some success message'
    mutations.removeSuccess(state)
    expect(state.success).toBe(null)
  })
  it('mutation resetState should set state to its default values', () => {
    mutations.setUser(state, mockAuthLogin.user) // Fill the store with something
    mutations.resetState(state)
    expect(state).toMatchObject(initialState())
  })
})
