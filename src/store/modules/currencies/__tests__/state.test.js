import state from '@/store/modules/currencies/state'

describe('modules/currencies/state.js', () => {

  it('state has the correct initial state', () => {
    expect(state.currencies).toBe(null)
    expect(state.isLoading).toBe(null)
  })
})
