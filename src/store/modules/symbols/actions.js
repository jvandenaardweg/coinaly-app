import * as api from '@/api/symbols'

export default {
  async getAll ({ dispatch, commit, getters, rootGetters }, options) {
    commit('startLoading')

    try {
      const response = await api.getAllSymbols(options)
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
