import getters from '@/store/modules/balances/getters'
import state from '@/store/modules/balances/state'
import balancesMock from '@/mocks/balances.json'

describe('modules/balances/getters.js', () => {
  it('getter hasBalances should return false when there are no currencies', () => {
    expect(getters.hasBalances(state)).toBe(false)
  })

  it('getter hasBalances should return true when there are currencies', () => {
    state.balances = balancesMock
    expect(getters.hasBalances(state)).toBe(true)
  })

  it('getter allCurrencies should return all the currencies', () => {
    state.balances = balancesMock
    expect(getters.allCurrencies(state)).toMatchObject(balancesMock)
  })

  it('getter allCurrenciesTotal should return the total currencies', () => {
    state.balances = {}
    expect(getters.allCurrenciesTotal(state)).toBe(0)

    state.balances = balancesMock
    expect(getters.allCurrenciesTotal(state)).toBe(3)
  })

  it('getter allFilledBalances should return currencies that are not empty', () => {
    state.balances = balancesMock
    const expected = {'BTC': {'free': 2, 'total': 2, 'used': 0}}
    expect(getters.allFilledBalances(state)).toMatchObject(expected)
  })

  it('getter allFilledBalancesTotal should return the total of currencies that are not empty', () => {
    state.balances = balancesMock
    state.balances['BTC'].total = 10
    state.balances['ETH'].total = 1
    expect(getters.allFilledBalancesTotal(state)).toBe(2)
  })

  it('getter isLoading should return true when state.isLoading is true', () => {
    state.isLoading = true
    expect(getters.isLoading(state)).toBe(true)
  })

  it('getter isLoading should return false when state.isLoading is false', () => {
    state.isLoading = false
    expect(getters.isLoading(state)).toBe(false)
  })

  it('getter error should return an error message', () => {
    state.error = 'An error happened'
    expect(getters.error(state)).toBe('An error happened')
  })

  it('getter getBalanceBySymbol should return the balance from a given symbol', () => {
    state.balances = balancesMock
    expect(getters.getBalanceBySymbol(state)('BTC')).toMatchObject(balancesMock['BTC'])
  })
})
