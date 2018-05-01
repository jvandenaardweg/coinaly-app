import mutations from '@/store/modules/user/mutations'
import state from '@/store/modules/user/state'

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
})
