import pickBy from 'lodash/pickBy'

function filterFilledCurrencies (currencies) {
  return pickBy(currencies, (currency, currencyName) => {
    return currency.total > 0
  })
}

export default {
  hasCurrencies: state => {
    return Object.keys(state.currencies).length > 0
  },
  allCurrencies: state => {
    return state.currencies
  },
  allCurrenciesTotal: state => {
    return Object.keys(state.currencies).length
  },
  allFilledCurrencies: state => {
    return filterFilledCurrencies(state.currencies)
  },
  allFilledCurrenciesTotal: state => {
    return Object.keys(filterFilledCurrencies(state.currencies)).length
  },
  isLoading: state => {
    return state.isLoading
  },
  serverError: state => {
    return state.serverError
  }
}
