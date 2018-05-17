import Vue from 'vue'
import initialState from '@/store/modules/balances/initialState'

export default {
  addAll (state, items) {
    delete items.info
    Vue.set(state, 'balances', items)
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
  },
  resetState (state) {
    const s = initialState()
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  }
}
