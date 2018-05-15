import pickBy from 'lodash/pickBy'

function filterFilledBalances (balances) {
  return pickBy(balances, (balance, symbol) => {
    return balance.total > 0
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
    return filterFilledBalances(state.balances)
  },
  allFilledBalancesTotal: state => {
    return Object.keys(filterFilledBalances(state.balances)).length
  },
  getBalanceBySymbol: state => (symbol) => {
    if (state.balances) return state.balances[symbol]
    return null
  },
  isLoading: state => {
    return state.isLoading
  },
  serverError: state => {
    return state.serverError
  }
}
