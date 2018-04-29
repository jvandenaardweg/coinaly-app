import Vue from 'vue'

export default {
  setTicker (state, ticker) {
    Vue.set(state.tickers, Object.keys(ticker), ticker[Object.keys(ticker)])
  },
  setTickers (state, tickers) {
    Object.keys(tickers).forEach((symbol, index) => {
      Vue.set(state.tickers, symbol, tickers[symbol])
    })
  },
  startLoading (state) {
    Vue.set(state, 'isLoading', true)
  },
  stopLoading (state) {
    Vue.set(state, 'isLoading', false)
  }
}
