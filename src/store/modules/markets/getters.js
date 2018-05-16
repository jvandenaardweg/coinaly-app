import pickBy from 'lodash/pickBy'

export default {
  allMarkets: state => {
    return state.markets
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
      obj[state.markets[curKey].quote] = (obj[state.markets[curKey].quote] || 0) + 1
      // Returning something like: {"BTC": 101} // 101 = total quote markets
      return obj
    }, {})
  },
  allBaseMarkets: state => {
    if (!state.markets || !Object.keys(state.markets).length) return null

    return Object.keys(state.markets).reduce((obj, curKey) => {
      if (!obj[state.markets[curKey].base]) obj[state.markets[curKey].base] = []
      obj[state.markets[curKey].base].push(state.markets[curKey].quote)

      // Returning something like: {"ADA": ["BTC", "USDT"] } // Where BTC is the symbol we can use to calculate the worth of one ADA
      return obj
    }, {})
  },
  unavailableBaseMarkets: (state, getters, rootState, rootGetters) => {
    // Getter dependency: balances
    const allFilledBalances = rootGetters['balances/allFilledBalances']
    const allBaseMarkets = getters.allBaseMarkets

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

    if (allBaseMarkets && allFilledBalances) {
      return pickBy(allBaseMarkets, (baseMarket, baseMarketSymbol) => {
        // A market is available when atleast one or more balance symbols is present in the base markets object
        return Object.keys(allFilledBalances).some(balanceSymbol => {
          return baseMarket.includes(balanceSymbol)
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
      return null
    }
  },
  getMarketBySymbol: (state) => (marketSymbol) => {
    // marketSymbol String "BTC/USDT"
    if (state.markets) {
      return state.markets[marketSymbol]
    } else {
      return null
    }
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
