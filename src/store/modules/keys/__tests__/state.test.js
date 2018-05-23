import state from '@/store/modules/keys/state'

describe('modules/keys/state.js', () => {
  it('state has the correct initial state', () => {
    expect(state.keys).toBe(null)
    expect(state.isLoading).toBe(null)
    expect(state.error).toBe(null)
  })
})
