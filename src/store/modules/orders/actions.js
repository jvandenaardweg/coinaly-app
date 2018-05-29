import * as api from '@/api/orders'

export default {
  async getAllClosedOrders ({ commit, rootGetters }, symbolId = null) {
    try {
      commit('startLoading')
      commit('removeError')

      const selectedExchange = rootGetters['exchanges/selected']
      const response = await api.getAllClosedOrders(selectedExchange, symbolId)
      if (response) {
        commit('addAllClosed', response)
      }
      return response
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : 'Oh oh, sorry for this. An unknown error occured, please try again later.'
      commit('setError', errorMessage)
      return error
    } finally {
      commit('stopLoading')
    }
  },

  async getAllOpenOrders ({ commit, rootGetters }, symbolId = null) {
    try {
      commit('startLoading')
      commit('removeError')
      const selectedExchange = rootGetters['exchanges/selected']
      const response = await api.getAllOpenOrders(selectedExchange, symbolId)
      if (response) {
        commit('addAllOpen', response)
      }
      return response
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : 'Oh oh, sorry for this. An unknown error occured, please try again later.'
      commit('setError', errorMessage)
      return error
    } finally {
      commit('stopLoading')
    }
  }
}
