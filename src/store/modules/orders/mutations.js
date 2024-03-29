import Vue from 'vue'
import initialState from '@/store/modules/orders/initialState'

export default {
  addAllClosed (state, orders) {
    Vue.set(state, 'closed', [])
    Vue.set(state, 'closed', orders)
  },
  addAllOpen (state, orders) {
    // TODO: Write test
    Vue.set(state, 'open', [])
    Vue.set(state, 'open', orders)
  },
  startLoading (state) {
    Vue.set(state, 'isLoading', true)
  },
  stopLoading (state) {
    Vue.set(state, 'isLoading', false)
  },
  setError (state, error) {
    Vue.set(state, 'error', error)
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
