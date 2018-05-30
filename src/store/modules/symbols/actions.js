import * as api from '@/api/symbols'

export default {
  async getAll ({ dispatch, commit, getters, rootGetters }, options) {
    try {
      commit('startLoading')
      const response = await api.getAllSymbols(options)
      if (response) {
        commit('addAll', response)
      }
      return response
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : 'We could not get the symbols information. Please try again later.'
      commit('setError', errorMessage)
      return error
    } finally {
      commit('stopLoading')
    }
  }
}
