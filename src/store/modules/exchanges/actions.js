import * as api from '@/api/exchanges'

export default {
  async getAllExchanges ({ commit }) {
    commit('startLoading')

    try {
      const response = await api.getAllExchanges()
      if (response) {
        commit('addAll', response)
        commit('stopLoading')
      }
      return response
    } catch (error) {
      commit('addServerError', error.message)
      commit('stopLoading')
      return error
    }
  }
}
