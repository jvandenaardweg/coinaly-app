import getters from '@/store/modules/user/getters'
import state from '@/store/modules/user/state'

import mockAuthLogin from '@/mocks/auth-login.json'
import mockUsersMe from '@/mocks/users-me.json'

describe('modules/user/getters.js', () => {
  it('getter isOnline should return true when isOnline is true', () => {
    state.isOnline = true
    expect(getters.isOnline(state)).toBe(true)
  })
  it('getter isOnline should return false when isOnline is false', () => {
    state.isOnline = false
    expect(getters.isOnline(state)).toBe(false)
  })
  it('getter user should return the user', () => {
    state.user = mockAuthLogin.user
    expect(getters.user(state)).toMatchObject(mockAuthLogin.user)
  })
  it('getter isLoading should return true/false', () => {
    state.isLoading = true
    expect(getters.isLoading(state)).toBe(true)
  })
  it('getter error should return an error message', () => {
    state.error = 'An error happened'
    expect(getters.error(state)).toBe('An error happened')
  })
  it('getter isOnboarded should return false when user is not present in store', () => {
    state.user = null
    expect(getters.isOnboarded(state)).toBe(false)
  })
  it('getter isOnboarded should return true user.onboarded value', () => {
    state.user = {
      onboarded: true
    }
    expect(getters.isOnboarded(state)).toBe(true)
  })
  it('getter success should return user.success', () => {
    state.success = 'Success message'
    expect(getters.success(state)).toBe('Success message')
  })
})
