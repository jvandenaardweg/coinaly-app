import pickBy from 'lodash/pickBy'

function filterFilledCurrencies (currencies) {
  return pickBy(currencies, (currency, currencyName) => {
    return currency.total > 0
  })
}

export default {
  hasCurrencies: state => {
    return Object.keys(state.balances).length > 0
  },
  allCurrencies: state => {
    return state.balances
  },
  allCurrenciesTotal: state => {
    return Object.keys(state.balances).length
  },
  allFilledBalances: state => {
    return filterFilledCurrencies(state.balances)
  },
  allFilledBalancesTotal: state => {
    return Object.keys(filterFilledCurrencies(state.balances)).length
  },
  isLoading: state => {
    return state.isLoading
  },
  serverError: state => {
    return state.serverError
  }
}
