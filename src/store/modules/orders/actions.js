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
  },

  async createLimitOrder ({ commit, rootGetters }, payload) {
    try {
      commit('startLoading')
      commit('removeError')
      const selectedExchange = rootGetters['exchanges/selected']
      const response = await api.createLimitOrder(selectedExchange, payload.side, payload.symbol, payload.amount, payload.price)
      return response
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : 'Creating a new order failed. Sorry about this! Please try again later.'
      commit('setError', errorMessage)
      return error
    } finally {
      commit('stopLoading')
    }
  },

  async cancelOrder ({ commit, rootGetters }, orderUuid) {
    try {
      commit('startLoading')
      commit('removeError')
      const selectedExchange = rootGetters['exchanges/selected']
      const response = await api.cancelOrder(selectedExchange, orderUuid)
      return response
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : 'Cancelling order failed. Sorry about this! Please try again later.'
      commit('setError', errorMessage)
      return error
    } finally {
      commit('stopLoading')
    }
  }
}
