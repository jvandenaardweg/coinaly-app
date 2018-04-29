import Vue from 'vue'

export default {
  addAll (state, currencies) {
    Vue.set(state, 'currencies', currencies)
  },
  addOne (state, currency) {
    Vue.set(state, 'currencies', currency)
  },
  startLoading (state) {
    Vue.set(state, 'isLoading', true)
  },
  stopLoading (state) {
    Vue.set(state, 'isLoading', false)
  }
}
