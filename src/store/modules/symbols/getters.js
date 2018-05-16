export default {
  symbols (state) {
    return state.symbols
  },
  isLoading (state) {
    return state.isLoading
  },
  getNameBySymbol: (state) => (symbol) => {
    // TODO: write test
    if (state.symbols && state.symbols[symbol]) return state.symbols[symbol].name
    return null
  }
}
