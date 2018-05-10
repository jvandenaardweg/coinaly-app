import { loadAllMarkets } from '../../../api/markets'

export default {
  async loadAll ({ commit, rootGetters }) {
    commit('startLoading')

    try {
      const selectedExchange = rootGetters['exchanges/selected']
      const response = await loadAllMarkets(false, selectedExchange)

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
  }
}
