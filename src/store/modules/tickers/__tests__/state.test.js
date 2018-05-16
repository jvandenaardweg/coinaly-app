import state from '@/store/modules/tickers/state'

describe('modules/tickers/state.js', () => {

  it('state has the correct initial state', () => {
    expect(typeof state.tickers).toBe('object')
    expect(state.isLoading).toBe(true)
  })
})
