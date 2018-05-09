import getters from '@/store/modules/prices/getters'
import state from '@/store/modules/prices/state'

import pricesMock from '@/mocks/prices.json'

describe('modules/prices/getters.js', () => {
  it('getter isLoading should return true when state.isLoading is true', () => {
    state.isLoading = true
    expect(getters.isLoading(state)).toBe(true)
  })

  it('getter isLoading should return false when state.isLoading is false', () => {
    state.isLoading = false
    expect(getters.isLoading(state)).toBe(false)
  })

  it('getter error should return a error message if state.error is set', () => {
    state.error = 'Sample error message'
    expect(getters.error(state)).toBe('Sample error message')
  })

  it('getter prices should return an array of prices if state.prices is set', () => {
    state.prices = pricesMock
    expect(getters.prices(state)).toMatchObject(pricesMock)
  })

  it('getter hasPrices should return true when state.prices has items', () => {
    state.prices = pricesMock
    expect(getters.hasPrices(state)).toBe(true)
  })

  it('getter hasPrices should return false when state.prices has no items', () => {
    state.prices = null
    expect(getters.hasPrices(state)).toBe(false)
  })

})
