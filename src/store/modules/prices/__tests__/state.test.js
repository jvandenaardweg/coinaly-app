import state from '@/store/modules/prices/state'

describe('modules/prices/state.js', () => {

  it('state has the correct initial state', () => {
    expect(state.prices).toBe(null)
    expect(state.isLoading).toBe(null)
    expect(state.error).toBe(null)
  })
})
