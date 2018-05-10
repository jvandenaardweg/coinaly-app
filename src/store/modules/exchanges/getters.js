export default {
  allExchanges (state) {
    return state.exchanges
  },
  allActiveExchanges (state) {
    if (state.exchanges) {
      return state.exchanges.filter(exchange => {
        return exchange.active === true
      })
    } else {
      return null
    }
  },
  selected (state) {
    return state.selected
  },
  selectedName (state) {
    if (state.available[state.selected]) {
      return state.available[state.selected].name
    } else {
      return null
    }
  },
  isLoading (state) {
    return state.isLoading
  }
}
