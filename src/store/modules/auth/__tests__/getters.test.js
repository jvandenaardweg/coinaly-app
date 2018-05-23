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

  it('getter error should return a error message if state.error is set', () => {
    state.error = 'Sample error message'
    expect(getters.error(state)).toBe('Sample error message')
  })

  it('getter isVerified should return true if state.isVerified is set', () => {
    state.isVerified = true
    expect(getters.isVerified(state)).toBe(true)
  })

  it('getter success should return a message state.success is set', () => {
    state.success = 'This is a success message'
    expect(getters.success(state)).toBe('This is a success message')
  })
})
