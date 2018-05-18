import getters from '@/store/modules/symbols/getters'
import state from '@/store/modules/symbols/state'

import mockSymbols from '@/mocks/symbols.json'

describe('modules/symbols/getters.js', () => {
  it('getter symbols should return the symbol info', () => {
    state.symbols = mockSymbols
    expect(getters.symbols(state)['BTC'].name).toBe('Bitcoin')
    expect(getters.symbols(state)['ETH'].name).toBe('Ethereum')
  })

  it('getter isLoading should return true when loading', () => {
    state.isLoading = true
    expect(getters.isLoading(state)).toBe(true)
  })

  it('getter isLoading should return false when not loading', () => {
    state.isLoading = false
    expect(getters.isLoading(state)).toBe(false)
  })

  it('getter getNameBySymbol should return the full name of a symbol if state.symbols is set', () => {
    state.symbols = mockSymbols
    expect(getters.getNameBySymbol(state)('BTC')).toBe('Bitcoin')
  })

  it('getter getNameBySymbol should return null if state.symbols is not set', () => {
    state.symbols = null
    expect(getters.getNameBySymbol(state)('BTC')).toBe(null)
  })
})
