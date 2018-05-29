import state from '@/store/modules/orders/state'

describe('modules/orders/state.js', () => {
  it('state has the correct initial state', () => {
    expect(state.closed).toMatchObject([])
    expect(state.open).toMatchObject([])
    expect(state.isLoading).toBe(null)
  })
})
