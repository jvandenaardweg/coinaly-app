export default {
  prices: state => {
    return state.prices
  },
  hasPrices: state => {
    return (state.prices) ? (Object.keys(state.prices).length > 0) : false
  },
  getPriceBySymbol: (state) => (symbolId) => {
    // TODO: write test
    if (state.prices) return state.prices[symbolId]
    return null
  },
  isLoading: state => {
    return state.isLoading
  },
  error: state => {
    return state.error
  }
}
