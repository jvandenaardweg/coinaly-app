import store from '../index'

describe('modules/symbols.js', () => {
  it('should return list of cryptocurrency symbols', () => {
    expect(typeof store.state.symbols).toBe('object')
    expect(Object.keys(store.state.symbols).length).toBeGreaterThan(50)
  })

  it('getter should return the full name of a currency when given a symbol', () => {
    expect(store.getters['symbols/name']['BTC']).toBe('Bitcoin')
    expect(store.getters['symbols/name']['ETH']).toBe('Ethereum')
    expect(store.getters['symbols/name']['USDT']).toBe('Tether')
  })
})