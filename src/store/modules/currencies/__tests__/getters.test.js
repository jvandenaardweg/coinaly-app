import getters from '@/store/modules/currencies/getters'
import state from '@/store/modules/currencies/state'

import mockCurrencies from '@/mocks/currencies.json'

describe('modules/currencies/getters.js', () => {
  it('getter currency should return the currency info', () => {
    state.currencies = mockCurrencies
    expect(getters.currency(state)['BTC'].name).toBe('Bitcoin')
    expect(getters.currency(state)['ETH'].name).toBe('Ethereum')
  })

  it('getter isLoading should return true when loading', () => {
    state.isLoading = true
    expect(getters.isLoading(state)).toBe(true)
  })

  it('getter isLoading should return false when not loading', () => {
    state.isLoading = false
    expect(getters.isLoading(state)).toBe(false)
  })
})
