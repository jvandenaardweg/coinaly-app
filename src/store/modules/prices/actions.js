import * as api from '@/api/prices'

export default {
  async getAllPrices ({ commit }) {
    commit('startLoading')
    commit('removeError')

    try {
      const response = await api.getAllPrices()
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
