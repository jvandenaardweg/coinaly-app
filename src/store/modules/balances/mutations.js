import Vue from 'vue'

export default {
  addAll (state, items) {
    delete items.info
    Vue.set(state, 'currencies', items)
  },
  startLoading (state) {
    Vue.set(state, 'isLoading', true)
  },
  stopLoading (state) {
    Vue.set(state, 'isLoading', false)
  },
  setError (state) {
    Vue.set(state, 'hasError', true)
  },
  removeError (state) {
    Vue.set(state, 'hasError', false)
  },
  addServerError (state, error) {
    Vue.set(state, 'serverError', error)
  }
}
