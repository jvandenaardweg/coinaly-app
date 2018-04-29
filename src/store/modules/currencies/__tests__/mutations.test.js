import mutations from '@/store/modules/currencies/mutations'
import state from '@/store/modules/currencies/state'

import mockCurrencies from '@/mocks/currencies.json'
import mockCurrency from '@/mocks/currency.json'

describe('modules/currencies/mutations.js', () => {
  it('mutation addAll should add all currencies', () => {
    mutations.addAll(state, mockCurrencies)
    expect(state.currencies).toMatchObject(mockCurrencies)
  })

  it('mutation add should add one currencie', () => {
    mutations.addOne(state, mockCurrency)
    expect(state.currencies).toMatchObject(mockCurrency)
  })

  it('mutation startLoading should set isLoading to true', () => {
    mutations.startLoading(state)
    expect(state.isLoading).toBe(true)
  })

  it('mutation stopLoading should set isLoading to false', () => {
    mutations.stopLoading(state)
    expect(state.isLoading).toBe(false)
  })
})
