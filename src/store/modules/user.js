import Vue from 'vue'

const initialIsOnline = window.navigator.onLine

export default {
  namespaced: true,
  state: {
    isOnline: initialIsOnline
  },
  mutations: {
    setOffline (state, ticker) {
      Vue.set(state, 'isOnline', false)
    },
    setOnline (state, ticker) {
      Vue.set(state, 'isOnline', true)
    }
  },
  getters: {
    isOnline: state => {
      return state.isOnline
    }
  },
  actions: { }
}
