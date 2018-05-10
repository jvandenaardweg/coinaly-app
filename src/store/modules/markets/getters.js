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
    if (!Object.keys(state.markets).length) return null

    return Object.keys(state.markets).reduce((obj, curKey) => {
      obj[state.markets[curKey].quote] = (obj[state.markets[curKey].quote] || 0) + 1
      // Returning something like: {"BTC": 101} // 101 = total quote markets
      return obj
    }, {})
  },
  allBaseMarkets: state => {
    if (!Object.keys(state.markets).length) return null

    return Object.keys(state.markets).reduce((obj, curKey) => {
      if (!obj[state.markets[curKey].base]) {
        obj[state.markets[curKey].base] = state.markets[curKey].quote
      }

      // Returning something like: {"ADA": "BTC"} // Where BTC is the symbol we can use to calculate the worth of one ADA
      return obj
    }, {})
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
