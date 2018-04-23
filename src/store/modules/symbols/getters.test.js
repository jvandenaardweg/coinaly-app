import getters from '@/store/modules/symbols/getters'
import state from '@/store/modules/symbols/state'

describe('modules/symbols/getters.js', () => {
  it('getter name should return the full name of a currency', () => {
    expect(getters.name(state)['BTC']).toBe('Bitcoin')
    expect(getters.name(state)['ETH']).toBe('Ethereum')
  })
})
