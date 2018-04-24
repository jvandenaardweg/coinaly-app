import mutations from '@/store/modules/user/mutations'
import state from '@/store/modules/user/state'

describe('modules/user/mutations.js', () => {
  it('setOffline sets state.isOnline to false', () => {
    mutations.setOffline(state)
    expect(state.isOnline).toBe(false)
  })
  it('setOnline sets state.isOnline to true', () => {
    mutations.setOnline(state)
    expect(state.isOnline).toBe(true)
  })
})
