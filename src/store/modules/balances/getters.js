import pickBy from 'lodash/pickBy'

function filterFilledBalances (balances) {
  return pickBy(balances, (balance, symbol) => {
    return balance.total > 0
  })
}

export default {
  hasBalances: state => {
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
  error: state => {
    return state.error
  },
  allBalancePrices: (state, getters, rootState, rootGetters) => {
    // TODO: write test
    const getPriceBySymbol = rootGetters['prices/getPriceBySymbol']
    const baseMarkets = rootGetters['markets/allBaseMarkets']
    const quoteMarkets = rootGetters['markets/allQuoteMarkets']
    const getTickerBySymbol = rootGetters['tickers/getTickerBySymbol']
    const isLoadingTickers = rootGetters['tickers/isLoading']
    const isLoadingPrices = rootGetters['prices/isLoading']
    const isLoadingMarkets = rootGetters['markets/isLoading']
    const filledBalances = getters.allFilledBalances

    if (!isLoadingPrices && !isLoadingMarkets && filledBalances && !isLoadingTickers) {
      return Object.keys(filledBalances).reduce((obj, symbolId) => {
        let marketSymbol
        let priceSymbol
        let quoteId
        let baseId
        let price
        let totalInBalance
        let ticker
        let tickerLast

        // Determine the proper baseId and quoteId for the balance symbol
        // Example: If symbolId is "BTC", we look up the first quoteMarket for that symbol
        // If we cannot find the symbolId in the baseMarkets (for example for "USDT"), we find the baseId in the quoteMarkets array, returning "BTC" in this context
        //   so baseId becomes "BTC" and quoteId becomes "USDT"
        baseId = (baseMarkets[symbolId]) ? symbolId : null
        quoteId = (baseMarkets[symbolId]) ? baseMarkets[symbolId][0] : symbolId

        marketSymbol = `${baseId}/${quoteId}`

        // If we have a baseId, we calculate the price using the last ticker to calculate the worth
        // If we don't have a baseId, it's probably USDT or something similar, we just use the global average price to calculate the worth
        if (baseId) {
          ticker = getTickerBySymbol(marketSymbol)
          tickerLast = (ticker) ? ticker.last : 0 // Like: 0.001231231
          price = getPriceBySymbol(quoteId).USD // Like: 8913
          totalInBalance = filledBalances[symbolId].total // Like: 0.123123
          obj[symbolId] = totalInBalance * (price * tickerLast)
        } else {
          totalInBalance = filledBalances[symbolId].total // Like: 0.123123
          price = getPriceBySymbol(quoteId).USD // Like: 8913
          obj[symbolId] = totalInBalance * price
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
