import mutations from '@/store/modules/symbols/mutations'
import state from '@/store/modules/symbols/state'
import initialState from '@/store/modules/symbols/initialState'

import mockSymbols from '@/mocks/symbols.json'
import mockSymbol from '@/mocks/symbol.json'

describe('modules/symbols/mutations.js', () => {
  it('mutation addAll should add all symbols', () => {
    mutations.addAll(state, mockSymbols)
    expect(state.symbols).toMatchObject(mockSymbols)
  })

  it('mutation add should add one symbol', () => {
    mutations.addOne(state, mockSymbol)
    expect(state.symbols).toMatchObject(mockSymbol)
  })

  it('mutation startLoading should set isLoading to true', () => {
    mutations.startLoading(state)
    expect(state.isLoading).toBe(true)
  })

  it('mutation stopLoading should set isLoading to false', () => {
    mutations.stopLoading(state)
    expect(state.isLoading).toBe(false)
  })

  it('mutation resetState should set state to its default values', () => {
    mutations.startLoading(state) // Fill the store with something
    mutations.resetState(state)
    expect(state).toMatchObject(initialState())
  })
})
