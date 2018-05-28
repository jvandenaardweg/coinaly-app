import * as api from '@/api/balances'
// import util from 'util'
export default {
  async getAll ({ dispatch, commit, getters, rootGetters }, options) {
    try {
      commit('startLoading')
      const selectedExchange = rootGetters['exchanges/selected']
      const response = await api.getAllBalances(options, selectedExchange)
      if (response) {
        commit('addAll', response)
      }
      return response
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : 'We could not get your balance from the exchange. Please try again later.'
      commit('setError', errorMessage)
      return error
    } finally {
      commit('stopLoading')
    }
  }
}
