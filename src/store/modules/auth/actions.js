import * as api from '@/api/auth'

export default {
  async login ({ dispatch, commit, getters, rootGetters }, payload) {
    commit('startLoading')

    try {
      const response = await api.login(payload.email, payload.password)
      if (response) {
        commit('stopLoading')
        commit('setAuthenticated')
        commit('setToken', response.token)
      }
      return response
    } catch (error) {
      const errorMessage = error.response.data.message || 'Unknown error'
      commit('setError', errorMessage)
      commit('stopLoading')
      return error
    }
  }
}
