import Vue from 'vue'

const initialIsOnline = window.navigator.onLine

export default {
  namespaced: true,
  state: {
    isOnline: initialIsOnline,
    marketFavorites: {
      'bittrex': {
        'LTC/BTC': true,
        'ADA/BTC': true
      },
      'binance': {}
    }
  },
  mutations: {
    setOffline (state, ticker) {
      Vue.set(state, 'isOnline', false)
    },
    setOnline (state, ticker) {
      Vue.set(state, 'isOnline', true)
    }
  },
  getters: {
    isOnline: state => {
      return state.isOnline
    },
    marketFavorites: state => {
      return state.marketFavorites
    }
  },
  actions: { }
}
