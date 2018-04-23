import * as api from '@/api/balances'

export default {
  async getAll ({ dispatch, commit, getters, rootGetters }, options) {
    commit('startLoading')
    const selectedExchange = rootGetters['exchanges/selected']

    try {
      const response = await api.getAllBalances(options, selectedExchange)
      commit('addAll', response)
      commit('stopLoading')
    } catch (e) {
      commit('addServerError', e)
      commit('stopLoading')
    }
  }
}
