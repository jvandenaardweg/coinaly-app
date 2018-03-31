const cryptocurrencies = require('cryptocurrencies')

export default {
  namespaced: true,
  state: cryptocurrencies,
  mutations: {},
  getters: {
    name (state) {
      return state
    }
  },
  actions: {}
}
