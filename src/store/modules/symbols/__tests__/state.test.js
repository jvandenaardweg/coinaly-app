import state from '@/store/modules/symbols/state'

describe('modules/symbols/state.js', () => {

  it('state has the correct initial state', () => {
    expect(state.symbols).toBe(null)
    expect(state.isLoading).toBe(null)
  })
})
