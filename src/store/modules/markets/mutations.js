import Vue from 'vue'

export default {
  addAll (state, markets) {
    Vue.set(state, 'markets', markets)
  },
  addFavorites (state, favorites) {
    Vue.set(state, 'favorites', favorites)
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
  }
}
