import state from '@/store/modules/user/state'

describe('modules/user/state.js', () => {

  it('state has the correct initial state', () => {
    expect(state.user).toBe(null)
    expect(state.isLoading).toBe(null)
    expect(state.error).toBe(null)
    expect(state.success).toBe(null)
    expect(state.isOnline).toBe(true)
    expect(typeof state.marketFavorites).toBe('object')
  })
})
