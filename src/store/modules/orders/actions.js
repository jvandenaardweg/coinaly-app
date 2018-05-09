import * as api from '@/api/orders'

export default {
  async getAllClosedOrders ({ commit }, exchangeSlug) {
    commit('startLoading')
    commit('removeError')

    try {
      const response = await api.getAllClosedOrders(exchangeSlug)
      if (response) {
        commit('addAllClosed', response)
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
