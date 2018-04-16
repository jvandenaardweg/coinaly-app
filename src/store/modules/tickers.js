import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    tickers: {}
  },
  mutations: {
    setTicker (state, ticker) {
      Vue.set(state.tickers, Object.keys(ticker), ticker[Object.keys(ticker)])
    },
    setTickers (state, tickers) {
      Object.keys(tickers).forEach((symbol, index) => {
        Vue.set(state.tickers, symbol, tickers[symbol])
      })
    }
  },
  getters: {
    allTickers (state) {
      return state.tickers
    }
  },
  actions: { }
}
