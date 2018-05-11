import Vue from 'vue'

export default {
  setOffline (state, ticker) {
    Vue.set(state, 'isOnline', false)
  },
  setOnline (state, ticker) {
    Vue.set(state, 'isOnline', true)
  },
  setUser (state, user) {
    Vue.set(state, 'user', user)
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
  removeSuccess (state) {
    Vue.set(state, 'success', null)
  }
}
