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
  }
}
