import * as api from '../../../api/markets'

export default {
  async loadAll ({ commit, rootGetters }) {
    commit('startLoading')

    try {
      const selectedExchange = rootGetters['exchanges/selected']
      const response = await api.loadAllMarkets(false, selectedExchange)

      if (response) {
        commit('addAll', response)
        commit('stopLoading')
      }
      return response
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : 'Oh oh, sorry for this. An unknown error occured, please try again later.'
      commit('setError', errorMessage)
      commit('stopLoading')
      return error
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
      const errorMessage = (error.response) ? error.response.data.message : 'Oh oh, sorry for this. An unknown error occured, please try again later.'
      commit('setError', errorMessage)
      commit('stopLoading')
      return error
    }
  }
}
