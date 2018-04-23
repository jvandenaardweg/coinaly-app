import Vue from 'vue'

export default {
  setSelected (state, exchangeName) {
    const exchangeSlug = exchangeName.toLowerCase()
    Vue.set(state, 'selected', exchangeSlug)

    if (process.env.NODE_ENV === 'production') {
      Vue.cookie.set('selectedExchange', exchangeSlug, { expires: '99Y', domain: 'coinaly.io' })
    } else {
      Vue.cookie.set('selectedExchange', exchangeSlug, { expires: '99Y', domain: 'localhost' })
    }
  }
}
