import * as api from '@/api/currencies'

export default {
  async getAll ({ dispatch, commit, getters, rootGetters }, options) {
    commit('startLoading')

    try {
      const response = await api.getAllCurrencies(options)
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
