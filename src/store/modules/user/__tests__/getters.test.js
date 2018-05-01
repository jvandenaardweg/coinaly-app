import getters from '@/store/modules/user/getters'
import state from '@/store/modules/user/state'

import mockAuthLogin from '@/mocks/auth-login.json'

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
})
