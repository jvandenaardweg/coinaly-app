import * as api from '@/api/users'

export default {
  async create ({ commit }, payload) {
    commit('startLoading')
    commit('removeError')

    try {
      const response = await api.create(payload.email, payload.password, payload.emailOptIn)
      if (response) {
        commit('stopLoading')
        commit('setUser', response.user)
      }
      return response
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : 'Oh oh, sorry for this. An unknown error occured, please try again later.'
      commit('setError', errorMessage)
      commit('stopLoading')
      return new Error('Failed to login')
    }
  },

  async getMe ({ commit }) {
    commit('startLoading')
    commit('removeError')

    try {
      const response = await api.getMe()
      if (response) {
        commit('stopLoading')
        commit('setUser', response)
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
