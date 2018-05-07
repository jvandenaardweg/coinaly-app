import Vue from 'vue'

export default {
  addAll (state, exchanges) {
    Vue.set(state, 'exchanges', exchanges)
  },
  setSelected (state, exchangeName) {
    const exchangeSlug = exchangeName.toLowerCase()
    Vue.set(state, 'selected', exchangeSlug)

    if (process.env.NODE_ENV === 'production') {
      Vue.cookie.set('selectedExchange', exchangeSlug, { expires: '99Y', domain: 'coinaly.io' })
    } else {
      Vue.cookie.set('selectedExchange', exchangeSlug, { expires: '99Y', domain: 'localhost' })
    }
  },
  startLoading (state) {
    Vue.set(state, 'isLoading', true)
  },
  stopLoading (state) {
    Vue.set(state, 'isLoading', false)
  }
}
