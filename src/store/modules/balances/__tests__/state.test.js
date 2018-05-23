import state from '@/store/modules/balances/state'

describe('modules/balances/state.js', () => {
  it('state has the correct initial state', () => {
    expect(typeof state.balances).toBe('object')
    expect(state.isLoading).toBe(null)
    expect(state.hasError).toBe(null)
    expect(state.serverError).toBe(null)
  })
})
