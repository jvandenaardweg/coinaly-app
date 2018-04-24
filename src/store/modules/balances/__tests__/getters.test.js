import getters from '@/store/modules/balances/getters'
import state from '@/store/modules/balances/state'
import balancesMock from '@/mocks/balances.json'

describe('modules/balances/getters.js', () => {

  it('getter hasCurrencies should return false when there are no currencies', () => {
    expect(getters.hasCurrencies(state)).toBe(false)
  })

  it('getter hasCurrencies should return true when there are currencies', () => {
    state.currencies = balancesMock
    expect(getters.hasCurrencies(state)).toBe(true)
  })

  it('getter allCurrencies should return all the currencies', () => {
    state.currencies = balancesMock
    expect(getters.allCurrencies(state)).toMatchObject(balancesMock)
  })

  it('getter allCurrenciesTotal should return the total currencies', () => {
    state.currencies = {}
    expect(getters.allCurrenciesTotal(state)).toBe(0)

    state.currencies = balancesMock
    expect(getters.allCurrenciesTotal(state)).toBe(3)
  })

  it('getter allFilledCurrencies should return currencies that are not empty', () => {
    state.currencies = balancesMock
    state.currencies['BTC'].total = 10
    const expected = {"BTC": {"free": 0, "total": 10, "used": 0}}
    expect(getters.allFilledCurrencies(state)).toMatchObject(expected)
  })

  it('getter allFilledCurrenciesTotal should return the total of currencies that are not empty', () => {
    state.currencies = balancesMock
    state.currencies['BTC'].total = 10
    state.currencies['ETH'].total = 1
    expect(getters.allFilledCurrenciesTotal(state)).toBe(2)
  })

  it('getter isLoading should return true when state.isLoading is true', () => {
    state.isLoading = true
    expect(getters.isLoading(state)).toBe(true)
  })

  it('getter isLoading should return false when state.isLoading is false', () => {
    state.isLoading = false
    expect(getters.isLoading(state)).toBe(false)
  })

  it('getter serverError should return the server error message', () => {
    state.serverError = 'Example error'
    expect(getters.serverError(state)).toBe('Example error')
  })

})
