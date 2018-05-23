import state from '@/store/modules/deposits/state'

describe('modules/deposits/state.js', () => {
  it('state has the correct initial state', () => {
    expect(state.deposits).toBe(null)
    expect(state.addresses).toMatchObject({})
    expect(state.isLoading).toBe(null)
    expect(state.error).toBe(null)
    expect(state.success).toBe(null)
  })
})
