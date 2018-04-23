import Vue from 'vue'

export default {
  setOffline (state, ticker) {
    Vue.set(state, 'isOnline', false)
  },
  setOnline (state, ticker) {
    Vue.set(state, 'isOnline', true)
  }
}
