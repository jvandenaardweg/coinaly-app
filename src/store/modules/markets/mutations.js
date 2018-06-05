import Vue from 'vue'
import initialState from '@/store/modules/markets/initialState'

export default {
  addAll (state, markets) {
    Vue.set(state, 'markets', markets)
  },
  addFavorites (state, favorites) {
    Vue.set(state, 'favorites', favorites)
  },
  addFavorite (state, marketSymbol) {
    // TODO: write test
    state.favorites.push(marketSymbol)
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
  },
  addOHLCV (state, payload) {
    const marketSymbol = payload.marketSymbol
    const dataObject = {
      [marketSymbol]: payload.data
    }
    // Make a JSON object, so we can target the store directly with a marketSymbol to retrieve the data, like:
    /*
      "BTC/USDT": [[data]]
    */
    Vue.set(state, 'ohlcv', dataObject)
  }
}
