import getters from '@/store/modules/auth/getters'
import state from '@/store/modules/auth/state'
// import authLoginMock from '@/mocks/auth-login.json'

describe('modules/auth/getters.js', () => {

  it('getter isLoading should return true when state.isLoading is true', () => {
    state.isLoading = true
    expect(getters.isLoading(state)).toBe(true)
  })

  it('getter isLoading should return false when state.isLoading is false', () => {
    state.isLoading = false
    expect(getters.isLoading(state)).toBe(false)
  })

  it('getter isAuthenticated should return true when state.isAuthenticated is true', () => {
    state.isAuthenticated = true
    expect(getters.isAuthenticated(state)).toBe(true)
  })

  it('getter isAuthenticated should return false when state.isAuthenticated is false', () => {
    state.isAuthenticated = false
    expect(getters.isAuthenticated(state)).toBe(false)
  })

  it('getter token should return the token when state.token is set', () => {
    state.token = 'testtoken'
    expect(getters.token(state)).toBe('testtoken')
  })

})
