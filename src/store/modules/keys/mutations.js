import Vue from 'vue'
import initialState from '@/store/modules/keys/initialState'

export default {
  addAll (state, keys) {
    Vue.set(state, 'keys', keys)
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
  setSuccess (state, message) {
    Vue.set(state, 'success', message)
  },
  removeSuccess (state, message) {
    Vue.set(state, 'success', null)
  },
  resetState (state) {
    const s = initialState()
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  }
}
