import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    selected: null,
    exchanges: [],
    available: ['bittrex', 'binance'] // Inspiration for what exchange should be next: https://coinmarketcap.com/exchanges/volume/24-hour/
  },
  mutations: {
    setSelected (state, exchangeName) {
      const exchangeSlug = exchangeName.toLowerCase()
      Vue.set(state, 'selected', exchangeSlug)
    }
  },
  getters: {
    selected (state) {
      return state.selected
    }
  },
  actions: { }
}
