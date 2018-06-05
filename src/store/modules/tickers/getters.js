export default {
  allTickers (state) {
    return state.tickers
  },
  isLoading (state) {
    return state.isLoading
  },
  getTickerBySymbol: (state) => (symbol) => {
    if (state.tickers && state.tickers[symbol]) {
      return state.tickers[symbol]
    } else {
      return {}
    }
  }
}
