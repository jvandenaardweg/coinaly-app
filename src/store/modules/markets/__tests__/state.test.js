import state from '@/store/modules/markets/state'

describe('modules/markets/state.js', () => {
  it('state has the correct initial state', () => {
    expect(state.markets).toBe(null)
    expect(state.isLoading).toBe(null)
    expect(state.favorites).toBe(null)
    expect(state.error).toBe(null)
  })
})
