import * as api from '@/api/keys'

export default {
  async getAllKeys ({ commit }, payload) {
    commit('startLoading')

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
  }
}
