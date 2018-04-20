import Vue from 'vue'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

const initialSelectedExchange = Vue.cookie.get('selectedExchange') || null

export default {
  namespaced: true,
  state: {
    selected: initialSelectedExchange,
    exchanges: [],
    available: {
      'bittrex': {
        name: 'Bittrex'
      },
      'binance': {
        name: 'Binance'
      },
      'poloniex': {
        name: 'Poloniex'
      }
    }
  },
  mutations: {
    setSelected (state, exchangeName) {
      const exchangeSlug = exchangeName.toLowerCase()
      Vue.set(state, 'selected', exchangeSlug)

      if (process.env.NODE_ENV === 'production') {
        Vue.cookie.set('selectedExchange', exchangeSlug, { expires: '99Y', domain: 'coinaly.io' })
      } else {
        Vue.cookie.set('selectedExchange', exchangeSlug, { expires: '99Y', domain: 'localhost' })
      }
    }
  },
  getters: {
    selected (state) {
      return state.selected
    },
    selectedName (state) {
      return state.available[state.selected].name
    }
  },
  actions: { }
}
