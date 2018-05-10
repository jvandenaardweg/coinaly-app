import state from '@/store/modules/exchanges/state'

describe('modules/exchanges/state.js', () => {

  it('state has the correct initial state', () => {
    expect(state.exchanges).toBe(null)
    expect(state.isLoading).toBe(null)
    expect(state.selected).toBe(null)
  })
})
