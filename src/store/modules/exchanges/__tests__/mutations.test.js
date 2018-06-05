import mutations from '@/store/modules/exchanges/mutations'
import state from '@/store/modules/exchanges/state'
import initialState from '@/store/modules/exchanges/initialState'

import mockExchangesAll from '@/mocks/exchanges-all.json'

describe('modules/exchanges/mutations.js', () => {
  it('setSelected sets selected exchange', () => {
    mutations.setSelected(state, 'Bittrex')
    expect(state.selected).toBe('bittrex')
  })

  it('removeSelected unsets the selected exchange', () => {
    mutations.setSelected(state, 'Bittrex')
    mutations.removeSelected(state)
    expect(state.selected).toBe(null)
  })

  it('addAll adds all exchanges', () => {
    mutations.addAll(state, mockExchangesAll)
    expect(state.exchanges).toMatchObject(mockExchangesAll)
  })

  it('mutation startLoading sets state.isLoading to true', () => {
    mutations.startLoading(state)
    expect(state.isLoading).toBe(true)
  })

  it('mutation stopLoading sets state.isLoading to false', () => {
    mutations.stopLoading(state)
    expect(state.isLoading).toBe(false)
  })

  it('mutation resetState should set state to its default values', () => {
    mutations.setSelected(state, 'Bittrex') // Fill the store with something
    mutations.resetState(state)
    expect(state).toMatchObject(initialState())
  })
})
