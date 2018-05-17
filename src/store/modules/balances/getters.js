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
  },
  allBalancePrices: (state, getters, rootState, rootGetters) => {
    // TODO: write test
    const getPriceBySymbol = rootGetters['prices/getPriceBySymbol']
    const baseMarkets = rootGetters['markets/allBaseMarkets']
    const getTickerBySymbol = rootGetters['tickers/getTickerBySymbol']
    const isLoadingTickers = rootGetters['tickers/isLoading']
    const isLoadingPrices = rootGetters['prices/isLoading']
    const isLoadingMarkets = rootGetters['markets/isLoading']
    const filledBalances = getters.allFilledBalances

    if (!isLoadingPrices && !isLoadingMarkets && filledBalances && !isLoadingTickers) {
      return Object.keys(filledBalances).reduce((obj, baseSymbol) => {
        const quoteSymbol = baseMarkets[baseSymbol]
        if (quoteSymbol) {
          const ticker = getTickerBySymbol(`${baseSymbol}/${quoteSymbol[0]}`)
          const tickerLast = (ticker) ? ticker.last : 0 // Like: 0.001231231
          const price = getPriceBySymbol(quoteSymbol[0]).USD // Like: 8913
          const totalInBalance = filledBalances[baseSymbol].total // Like: 0.123123
          obj[baseSymbol] = totalInBalance * (price * tickerLast)
        }
        return obj // Returning something like: {"BTC": 8913} // 8913 = USD
      }, {})
    } else {
      return null
    }
  },
  totalBalancesPrices: (state, getters) => {
    // TODO: write test
    if (getters.allBalancePrices) {
      return Object.keys(getters.allBalancePrices).reduce((obj, symbol) => {
        return obj + getters.allBalancePrices[symbol]
      }, 0)
    } else {
      return null
    }
  }
}
