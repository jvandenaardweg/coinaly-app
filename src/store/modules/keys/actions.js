import * as api from '@/api/keys'

export default {
  async getAllKeys ({ commit }, payload) {
    commit('startLoading')
    commit('removeError')

    try {
      const response = await api.getAllKeys()
      if (response) {
        commit('addAll', response)
        commit('stopLoading')
      }
      return response
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : 'Oh oh, sorry for this. An unknown error occured, please try again later.'
      commit('setError', errorMessage)
      commit('stopLoading')
      return error
    }
  },

  async createKey ({ commit }, payload) {
    commit('startLoading')
    commit('removeError')
    commit('removeSuccess')

    try {
      const response = await api.createKey(payload.apiKey, payload.apiSecret, payload.exchangeId)
      if (response) {
        commit('stopLoading')
        commit('setSuccess', response.message)
      }
      return response
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : 'Oh oh, sorry for this. An unknown error occured, please try again later.'
      commit('setError', errorMessage)
      commit('stopLoading')
      return error
    }
  },

  async updateKey ({ commit }, payload) {
    commit('startLoading')
    commit('removeError')
    commit('removeSuccess')

    try {
      const response = await api.updateKey(payload.apiKey, payload.apiSecret, payload.exchangeId)
      if (response) {
        commit('stopLoading')
        commit('setSuccess', response.message)
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
