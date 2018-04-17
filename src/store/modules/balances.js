import Vue from 'vue'
// import axios from '../../axios'
import * as api from '@/api/balances'
import pickBy from 'lodash/pickBy'

function filterFilledCurrencies (currencies) {
  return pickBy(currencies, (currency, currencyName) => {
    return currency.total > 0
  })
}

export default {
  namespaced: true,
  state: {
    currencies: [],
    isLoading: false,
    hasError: false,
    worth: [],
    serverError: null
  },
  mutations: {
    addAll (state, items) {
      delete items.info
      Vue.set(state, 'currencies', items)
    },
    startLoading (state) {
      Vue.set(state, 'isLoading', true)
    },
    stopLoading (state) {
      Vue.set(state, 'isLoading', false)
    },
    setError (state) {
      Vue.set(state, 'hasError', true)
    },
    removeError (state) {
      Vue.set(state, 'hasError', false)
    },
    setWorth (state, payload) {
      Vue.set(state, 'worth', payload)
    },
    addServerError (state, error) {
      Vue.set(state, 'serverError', error)
    }
  },
  getters: {
    hasCalculatedWorths: state => {
      return Object.keys(state.worth).length
    },
    allWorth: state => {
      return state.worth
    },
    totalWorthUsd: state => {
      const worths = Object.values(state.worth)
      if (worths.length) {
        return worths.reduce((total, worth) => total + worth.usd, 0).toFixed(2)
      } else {
        return null
      }
    },
    hasCurrencies: state => {
      return Object.keys(state.currencies).length > 0
    },
    isEmpty: state => {
      return Object.keys(state.currencies).length === 0
    },
    allCurrencies: state => {
      return state.currencies
    },
    allCurrenciesTotal: state => {
      return Object.keys(state.currencies).length
    },
    allFilledCurrencies: state => {
      return filterFilledCurrencies(state.currencies)
    },
    allFilledCurrenciesTotal: state => {
      return Object.keys(filterFilledCurrencies(state.currencies)).length
    },
    isLoading: state => {
      return state.isLoading
    },
    serverError: state => {
      return state.serverError
    }
  },
  actions: {
    // getAll (context) {
    //   context.commit('startLoading')
    //   return axios.get(`balances`)
    //     .then(response => {
    //       context.commit('addAll', response.data)
    //     })
    //     .catch(error => {
    //       context.commit('addServerError', error.response.data)
    //       console.error('Failed to get the balances.', error)
    //     })
    //     .finally(() => {
    //       context.commit('stopLoading')
    //     })
    // }
    getAll ({ dispatch, commit, getters, rootGetters }, options) {
      commit('startLoading')
      const selectedExchange = rootGetters['exchanges/selected']
      return api.getAllBalances(options, selectedExchange)
        .then(response => {
          commit('addAll', response)
          commit('stopLoading')
        })
    }
  }
}
