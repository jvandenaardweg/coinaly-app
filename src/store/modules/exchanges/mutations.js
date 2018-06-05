import Vue from 'vue'
import initialState from '@/store/modules/exchanges/initialState'

export default {
  addAll (state, exchanges) {
    Vue.set(state, 'exchanges', exchanges)
  },
  setSelected (state, exchangeName) {
    const exchangeSlug = exchangeName.toLowerCase()
    Vue.set(state, 'selected', exchangeSlug)

    if (window.localStorage) {
      window.localStorage.setItem('selectedExchange', exchangeSlug)
    }
  },
  removeSelected (state) {
    Vue.set(state, 'selected', null)

    if (window.localStorage) {
      window.localStorage.removeItem('selectedExchange')
    }
  },
  startLoading (state) {
    Vue.set(state, 'isLoading', true)
  },
  stopLoading (state) {
    Vue.set(state, 'isLoading', false)
  },
  setError (state, message) {
    Vue.set(state, 'error', message)
  },
  removeError (state) {
    Vue.set(state, 'error', null)
  },
  resetState (state) {
    const s = initialState()
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  }
}
