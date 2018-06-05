export default {
  symbols (state) {
    return state.symbols
  },
  isLoading (state) {
    return state.isLoading
  },
  getNameBySymbol: (state) => (symbol) => {
    if (state.symbols && state.symbols[symbol]) return state.symbols[symbol].name
    return null
  },
  getSymbolBySymbol: (state) => (symbol) => {
    if (state.symbols && state.symbols[symbol]) return state.symbols[symbol]
    return {}
  }
}
