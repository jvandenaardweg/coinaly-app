import state from '@/store/modules/orders/state'

describe('modules/orders/state.js', () => {
  it('state has the correct initial state', () => {
    expect(state.orders).toBe(null)
    expect(state.closed).toBe(null)
    expect(state.open).toBe(null)
    expect(state.isLoading).toBe(null)
  })
})
