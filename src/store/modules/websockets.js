import Vue from 'vue'
import { websocketConnect } from '../../websocket'

export default {
  namespaced: true,
  state: {
    events: {
      error: {},
      connect: {},
      subscribeFail: {},
      subscribe: {},
      unsubscribe: {},
      subscribeStateChange: {},
      disconnect: {},
      close: {},
      kickOut: {}
    },
    socket: null
  },
  mutations: {
    addSocket (state, socket) {
      Vue.set(state, 'socket', socket)
    },
    setEventOutput (state, payload) {
      state.events[payload.eventName] = payload.eventData
    },
    removeEventOutput (state, eventName) {
      state.events[eventName] = {}
    },
    removeError (state) {
      state.hasError = false
    }
  },
  getters: {
    isLoading: state => {
      return state.isLoading
    },
    error: state => {
      return state.events.error
    }
  },
  actions: {
    // getTicker ({ commit, rootGetters }, symbol) {
    //   var socket = socketCluster.create(options)
    //   const selectedExchange = rootGetters['exchanges/selected']
    //   const exchangeDataChannel = socket.subscribe(`TICKERS~${selectedExchange}~${symbol}`)
    //   exchangeDataChannel.watch(function (response) {
    //     console.log('Received Ticker Data:', response)
    //     commit('tickers/addTicker', response, {root: true})
    //   })
    // },

    // subscribe({ commit, rootGetters }, channel) {
    //   const selectedExchange = rootGetters['exchanges/selected']
    //   const exchangeDataChannel = socket.subscribe(`TICKERS~${selectedExchange.toUpperCase()}~NEW`)
    // },

    subscribe ({ commit }, channel) {

    },

    connect ({ commit, rootGetters }) {
      const socket = websocketConnect()
      commit('addSocket', socket)

      const selectedExchange = rootGetters['exchanges/selected']
      const exchangeDataChannel = socket.subscribe(`TICKERS~${selectedExchange.toUpperCase()}~NEW`)

      exchangeDataChannel.watch(function (response) {
        console.log('Received Exchange Data:', response)
        // const markets = Object.values(response.data)
        commit('markets/addAllMarkets', response, {root: true})
        // context.commit('addPriceIndexes', response.data)
      })

      socket.on('subscribe', function (channelname) {
        console.log('subscribe:' + channelname)
        commit('setEventOutput', {
          eventName: 'subscribe',
          eventData: channelname
        })
      })

      socket.on('subscribeFail', function (channelname) {
        console.log('subscribeFail:' + channelname)
        commit('setEventOutput', {
          eventName: 'subscribeFail',
          eventData: channelname
        })
      })

      socket.on('unsubscribe', function (channelname) {
        console.log('unsubscribe:' + channelname)
        commit('setEventOutput', {
          eventName: 'unsubscribe',
          eventData: channelname
        })
      })

      socket.on('subscribeStateChange', function (data) {
        console.log('subscribeStateChange:' + JSON.stringify(data))
        commit('setEventOutput', {
          eventName: 'subscribeStateChange',
          eventData: data
        })
      })

      socket.on('message', function (data) {
        // console.log('message:' + data)
      })

      socket.on('error', function (data) {
        commit('setEventOutput', {
          eventName: 'error',
          eventData: data
        })
        console.log('Socketcluster Error', data)
      })

      socket.on('connect', function (data) {
        console.log('Socketcluster Connect', data)
        commit('removeEventOutput', 'error')
        commit('setEventOutput', {
          eventName: 'connect',
          eventData: data
        })
      })

      socket.on('disconnect', function (data) {
        console.log('Socketcluster Disconnect', data)
        commit('setEventOutput', {
          eventName: 'disconnect',
          eventData: data
        })
      })

      socket.on('close', function (data) {
        console.log('Socketcluster Close', data)
        commit('setEventOutput', {
          eventName: 'close',
          eventData: data
        })
      })

      socket.on('kickOut', function (data) {
        console.log('Socketcluster KickOut', data)
        commit('setEventOutput', {
          eventName: 'kickOut',
          eventData: data
        })
      })
    }
  }
}
