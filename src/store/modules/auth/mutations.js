import Vue from 'vue'

export default {
  setAuthenticated (state) {
    Vue.set(state, 'isAuthenticated', true)
  },
  unsetAuthenticated (state) {
    Vue.set(state, 'isAuthenticated', false)
  },
  startLoading (state) {
    Vue.set(state, 'isLoading', true)
  },
  stopLoading (state) {
    Vue.set(state, 'isLoading', false)
  },
  setToken (state, token) {
    Vue.set(state, 'token', token)
  }
}
