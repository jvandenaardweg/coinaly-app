import state from '@/store/modules/auth/state'

describe('modules/auth/state.js', () => {
  it('state has the correct initial state', () => {
    expect(state.isAuthenticated).toBe(false)
    expect(state.isLoading).toBe(null)
    expect(state.isVerified).toBe(null)
    expect(state.error).toBe(null)
    expect(state.success).toBe(null)
  })
})
