import Vue from 'vue'
import initialState from '@/store/modules/tickers/initialState'

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
  },
  resetState (state) {
    const s = initialState()
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  }
}
