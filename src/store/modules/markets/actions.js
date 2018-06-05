import * as api from '../../../api/markets'

export default {
  async loadAll ({ commit, rootGetters }) {
    try {
      commit('startLoading')
      const selectedExchange = rootGetters['exchanges/selected']
      const response = await api.loadAllMarkets(false, selectedExchange)

      if (response) {
        commit('addAll', response)
        commit('stopLoading')
      }
      return response
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : 'We could not get the markets information. Please try again later.'
      commit('setError', errorMessage)
      return error
    } finally {
      commit('stopLoading')
    }
  },

  async getOHLCV ({ commit, rootGetters }, payload) {
    commit('startLoading')

    const interval = payload.interval
    const marketSymbol = payload.marketSymbol
    const forceRefresh = payload.forceRefresh

    try {
      const selectedExchange = rootGetters['exchanges/selected']
      const response = await api.getOHLCV(selectedExchange, marketSymbol, interval, forceRefresh)

      if (response) {
        commit('addOHLCV', {
          marketSymbol: marketSymbol,
          interval: interval,
          data: response
        })
        commit('stopLoading')
      }
      return response
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : 'We could not get the markets OHLCV information. Please try again later.'
      commit('setError', errorMessage)
      commit('stopLoading')
      return error
    }
  },

  async addFavorite ({ commit, rootGetters }, payload) {
    // commit('startLoading')
    const marketSymbol = payload.marketSymbol

    try {
      const selectedExchange = rootGetters['exchanges/selected']
      const response = await api.addFavorite(selectedExchange, marketSymbol)

      if (response) {
        commit('addFavorite', marketSymbol)
      }
      return response
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : 'We could not add this market to your favorites. Please try again later.'
      // commit('setError', errorMessage)
      return errorMessage
    } finally {
      commit('stopLoading')
    }
  }
}
