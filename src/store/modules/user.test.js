import store from '../index'

describe('modules/user.js', () => {
  it('getter isOnline should return true when isOnline is true', () => {
    store.commit('user/setOnline')
    expect(store.getters['user/isOnline']).toBe(true)
  })
  it('getter isOnline should return false when isOnline is false', () => {
    store.commit('user/setOffline')
    expect(store.getters['user/isOnline']).toBe(false)
  }) 
})