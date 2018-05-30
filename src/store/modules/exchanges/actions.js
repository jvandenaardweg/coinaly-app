import * as api from '@/api/exchanges'

export default {
  async getAllExchanges ({ commit }) {
    try {
      commit('startLoading')
      const response = await api.getAllExchanges()
      if (response) {
        commit('addAll', response)
      }
      return response
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : 'We could not get the exchanges information. Please try again later.'
      commit('setError', errorMessage)
      return error
    } finally {
      commit('stopLoading')
    }
  }
}
