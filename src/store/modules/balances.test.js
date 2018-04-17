import store from '../index'
import balancesMock from '../../mocks/balances.json'

describe('modules/balances.js', () => {
  it('getter allCurrencies should return all balances', () => {
    store.commit('balances/addAll', balancesMock)
    expect(store.getters['balances/allCurrencies']).toBe(balancesMock)
  })

  it('getter allCurrenciesTotal should return balances total', () => {
    store.commit('balances/addAll', balancesMock)
    expect(store.getters['balances/allCurrenciesTotal']).toBe(3)
  })

  it('getter hasCurrencies should return true if we have something in balance', () => {
    store.commit('balances/addAll', balancesMock)
    expect(store.getters['balances/hasCurrencies']).toBe(true)
  })

  it('getter isEmpty should return true when balance is empty', () => {
    store.commit('balances/addAll', {})
    expect(store.getters['balances/isEmpty']).toBe(true)
  })

  it('getter allFilledCurrencies should return all filled balances', () => {
    balancesMock['BTC'].total = 10
    balancesMock['BTC'].free = 10
    store.commit('balances/addAll', balancesMock)
    const expected = {'BTC': {'free': 10, 'total': 10, 'used': 0}}
    expect(store.getters['balances/allFilledCurrencies']).toMatchObject(expected)
  })

  it('getter allFilledCurrenciesTotal should return the correct filled balances total', () => {
    balancesMock['BTC'].total = 10
    balancesMock['ETH'] = {
      free: 5,
      total: 5,
      used: 0
    }
    store.commit('balances/addAll', balancesMock)
    expect(store.getters['balances/allFilledCurrenciesTotal']).toBe(2)
  })
})
