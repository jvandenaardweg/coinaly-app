import * as api from '@/api/balances'
// import util from 'util'
export default {
  async getAll ({ dispatch, commit, getters, rootGetters }, options) {
    commit('startLoading')
    const selectedExchange = rootGetters['exchanges/selected']

    try {
      const response = await api.getAllBalances(options, selectedExchange)
      if (response) {
        commit('addAll', response)
        commit('stopLoading')
      }
      return response
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : 'We could not get your balance from the exchange. Please try again later.'
      commit('setError', errorMessage)
      commit('stopLoading')
      return error
    }
  }
}
