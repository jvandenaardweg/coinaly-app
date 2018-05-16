import * as api from '@/api/deposits'

export default {
  async getDepositAddress ({ commit, rootGetters }, payload) {
    commit('startLoading')
    commit('removeError')

    const exchange = rootGetters['exchanges/selected']

    try {
      const response = await api.getDepositAddress(payload.symbolId, exchange, payload.forceRefresh)
      if (response) {
        commit('addAddress', response)
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
