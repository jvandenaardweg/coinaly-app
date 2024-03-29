import Vue from 'vue'
import axios from '../../../axios'

export default {
  setAuthenticated (state) {
    Vue.set(state, 'isAuthenticated', true)
  },
  unsetAuthenticated (state) {
    Vue.set(state, 'isAuthenticated', false)
  },
  startLoading (state) {
    Vue.set(state, 'isLoading', true)
  },
  stopLoading (state) {
    Vue.set(state, 'isLoading', false)
  },
  setToken (state, token) {
    Vue.set(state, 'token', token)
    if (window.localStorage) localStorage.setItem('token', token)
    if (axios) axios.defaults.headers.common['authorization'] = token
  },
  removeToken (state) {
    Vue.set(state, 'token', null)
    if (window.localStorage) window.localStorage.removeItem('token')
  },
  setError (state, message) {
    Vue.set(state, 'error', message)
  },
  removeError (state) {
    Vue.set(state, 'error', null)
  },
  setVerified (state) {
    Vue.set(state, 'isVerified', true)
  },
  setSuccess (state, message) {
    Vue.set(state, 'success', message)
  }
}
