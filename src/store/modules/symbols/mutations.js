import Vue from 'vue'
import initialState from '@/store/modules/symbols/initialState'

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
  },
  resetState (state) {
    const s = initialState()
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  }
}
