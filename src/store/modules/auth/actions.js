import * as api from '@/api/auth'
import jwtDecode from 'jwt-decode'

export default {
  async login ({ commit }, payload) {
    commit('startLoading')
    commit('removeError')

    try {
      const response = await api.login(payload.email, payload.password)
      if (response) {
        commit('stopLoading')
        commit('setAuthenticated')
        commit('setToken', response.token)

        // Sets the user in the user store
        commit('user/setUser', response.user, { root: true })
      }
      return response
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : 'Oh oh, sorry for this. An unknown error occured, please try again later.'
      commit('setError', errorMessage)
      commit('stopLoading')
      return error
    }
  },

  async verify ({ commit }, verificationToken) {
    commit('startLoading')
    commit('removeError')

    try {
      const response = await api.verify(verificationToken)
      if (response) {
        commit('stopLoading')
        commit('setVerified')
      }
      return response
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : 'Oh oh, sorry for this. An unknown error occured, please try again later.'
      commit('setError', errorMessage)
      commit('stopLoading')
      return error
    }
  },

  async requestResetToken ({ commit }, email) {
    commit('startLoading')
    commit('removeError')

    try {
      const response = await api.requestResetToken(email)
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

  async resetPassword ({ commit }, payload) {
    commit('startLoading')
    commit('removeError')

    try {
      const response = await api.resetPassword(payload.password, payload.resetToken)
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

  logout ({ commit }) {
    commit('unsetAuthenticated')
    commit('removeToken')
    commit('exchanges/removeSelected', null, { root: true })
    window.location.reload(true)
  },

  setOnLoad ({ commit }, token) {
    commit('setAuthenticated')
    commit('setToken', token)
    commit('user/setUser', jwtDecode(token), { root: true })
  }
}
