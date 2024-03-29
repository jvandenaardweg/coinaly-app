import pickBy from 'lodash/pickBy'

export default {
  allMarkets: state => {
    return pickBy(state.markets, (market, marketSymbol) => {
      return market.active === true
    })
  },
  allFavoriteMarkets: state => {
    let favoriteMarkets = {}
    if (state.favorites && Object.keys(state.markets).length) {
      state.favorites.map(marketSymbol => {
        favoriteMarkets[marketSymbol] = state.markets[marketSymbol]
      })
    }
    return favoriteMarkets
  },
  totalFavoriteMarkets: state => {
    return (state.favorites) ? state.favorites.length : 0
  },
  hasFavoriteMarkets: state => {
    return (state.favorites) ? state.favorites.length > 0 : false
  },
  isFavoriteMarket: state => {
    return state.favorites
  },
  allQuoteMarkets: state => {
    if (!state.markets || !Object.keys(state.markets).length) return null

    return Object.keys(state.markets).reduce((obj, curKey) => {
      if (!obj[state.markets[curKey].quote] && state.markets[curKey].active) obj[state.markets[curKey].quote] = []
      if (state.markets[curKey].active) obj[state.markets[curKey].quote].push(state.markets[curKey].base)

      // obj[state.markets[curKey].quote] = (obj[state.markets[curKey].quote] || 0) + 1
      // Returning something like: {"BTC": ["USDT", "ETH"]}
      return obj
    }, {})
  },
  allBaseMarkets: state => {
    if (!state.markets || !Object.keys(state.markets).length) return null

    return Object.keys(state.markets).reduce((obj, curKey) => {
      if (!obj[state.markets[curKey].base] && state.markets[curKey].active) obj[state.markets[curKey].base] = []
      if (state.markets[curKey].active) obj[state.markets[curKey].base].push(state.markets[curKey].quote)

      // Returning something like: {"ADA": ["BTC", "USDT"] } // Where BTC is the symbol we can use to calculate the worth of one ADA
      return obj
    }, {})
  },
  allMarketSymbols: (state, getters) => {
    if (!state.markets || !Object.keys(state.markets).length) return null

    const allBaseMarkets = Object.assign({}, getters.allBaseMarkets)
    const allQuoteMarkets = Object.assign({}, getters.allQuoteMarkets)

    // Returning an array with symbol id's, like: ["ADA", "BTC", "USDT"] etc...
    return Object.keys(Object.assign(allQuoteMarkets, allBaseMarkets)).sort()
  },
  totalMarketSymbols: (state, getters) => {
    if (!getters.allMarketSymbols) return null
    return getters.allMarketSymbols.length
  },
  unavailableBaseMarkets: (state, getters, rootState, rootGetters) => {
    // Getter dependency: balances
    const allFilledBalances = rootGetters['balances/allFilledBalances']
    const allBaseMarkets = getters.allBaseMarkets
    // TODO: add a check if balance is < [marketSymbol].limits.amount.min
    if (allBaseMarkets && allFilledBalances) {
      return pickBy(allBaseMarkets, (baseMarket, baseMarketSymbol) => {
        // A market is unavailable when EVERY balance symbol is not present in the base markets object
        return Object.keys(allFilledBalances).every(balanceSymbol => {
          return !baseMarket.includes(balanceSymbol)
        })
      })
    }
  },
  availableBaseMarkets: (state, getters, rootState, rootGetters) => {
    // Getter dependency: balances
    const allFilledBalances = rootGetters['balances/allFilledBalances']
    const allBaseMarkets = getters.allBaseMarkets
    // TODO: add a check if balance is > [marketSymbol].limits.amount.min
    if (allBaseMarkets && allFilledBalances) {
      return pickBy(allBaseMarkets, (baseMarket, baseMarketSymbol) => {
        // A market is available when at least one or more balance symbols is present in the base markets object
        return Object.keys(allFilledBalances).some(balanceSymbol => {
          return baseMarket.includes(balanceSymbol)
        })
      })
    }
  },
  availableQuoteMarkets: (state, getters, rootState, rootGetters) => {
    // Getter dependency: balances
    const allFilledBalances = rootGetters['balances/allFilledBalances']
    const allQuoteMarkets = getters.allQuoteMarkets

    if (allQuoteMarkets && allFilledBalances) {
      return pickBy(allQuoteMarkets, (quoteMarket, quoteMarketSymbol) => {
        // A market is available when at least one or more balance symbols is present in the base markets object
        return Object.keys(allFilledBalances).some(balanceSymbol => {
          return quoteMarketSymbol === balanceSymbol
        })
      })
    }
  },
  totalAvailableBaseMarkets: (state, getters) => {
    // TODO: write test
    if (getters.availableBaseMarkets) return Object.keys(getters.availableBaseMarkets).length
    return 0
  },
  totalUnavailableBaseMarkets: (state, getters) => {
    // TODO: write test
    if (getters.unavailableBaseMarkets) return Object.keys(getters.unavailableBaseMarkets).length
    return 0
  },
  getQuoteMarketsBySymbolId: (state) => (symbolId) => {
    if (state.markets) {
      return pickBy(state.markets, (market, marketSymbolId) => {
        return market.baseId === symbolId
      })
    } else {
      return null
    }
  },
  getBaseMarketsBySymbolId: (state) => (symbolId) => {
    // symbolId String "BTC"
    if (state.markets) {
      return pickBy(state.markets, (market, marketSymbolId) => {
        return market.quoteId === symbolId
      })
    } else {
      return {}
    }
  },
  getMarketBySymbol: (state) => (marketSymbol) => {
    // marketSymbol String "BTC/USDT"
    if (state.markets) {
      return state.markets[marketSymbol]
    }
    return {}
  },
  ohlcv: state => {
    return state.ohlcv
  },
  hasMarkets: state => {
    return (state.markets) ? Object.keys(state.markets).length > 0 : false
  },
  totalMarkets: state => {
    return (state.markets) ? Object.keys(state.markets).length : 0
  },
  isLoading: state => {
    return state.isLoading
  },
  error: state => {
    return state.error
  }
}
