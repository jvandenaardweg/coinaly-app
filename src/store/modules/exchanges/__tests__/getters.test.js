import getters from '@/store/modules/exchanges/getters'
import state from '@/store/modules/exchanges/state'

import mockExchangesAll from '@/mocks/exchanges-all.json'

describe('modules/exchanges/getters.js', () => {
  it('getter selected should return the selected exchange', () => {
    state.selected = 'bittrex'
    expect(getters.selected(state)).toBe('bittrex')
  })

  it('getter selectedName should return the selected exchange name', () => {
    state.selected = 'bittrex'
    expect(getters.selectedName(state)).toBe('Bittrex')
  })

  it('getter allExchanges should return an array of exchanges', () => {
    state.exchanges = mockExchangesAll
    expect(getters.allExchanges(state)).toMatchObject(mockExchangesAll)
  })

  it('getter isLoading should return true when state.isLoading is true', () => {
    state.isLoading = true
    expect(getters.isLoading(state)).toBe(true)
  })

  it('getter isLoading should return false when state.isLoading is false', () => {
    state.isLoading = false
    expect(getters.isLoading(state)).toBe(false)
  })

  it('getter allActiveExchanges should return a filtered array from state.exchanges where exchange.active is true', () => {
    state.exchanges = mockExchangesAll

    const activeExchanges = mockExchangesAll.filter(exchange => {
      return exchange.active === true
    })

    expect(getters.allActiveExchanges(state)).toMatchObject(activeExchanges)
  })
})
