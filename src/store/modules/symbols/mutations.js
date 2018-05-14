import Vue from 'vue'

export default {
  addAll (state, symbols) {
    Vue.set(state, 'symbols', symbols)
  },
  addOne (state, symbol) {
    Vue.set(state, 'symbols', symbol)
  },
  startLoading (state) {
    Vue.set(state, 'isLoading', true)
  },
  stopLoading (state) {
    Vue.set(state, 'isLoading', false)
  }
}
