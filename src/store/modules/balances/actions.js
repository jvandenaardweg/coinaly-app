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
      commit('addServerError', error.message)
      commit('stopLoading')
      return error
    }
  }
}
