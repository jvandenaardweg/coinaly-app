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
    watching: null,
    subscribed: null,
    socket: null
  },
  mutations: {
    addSocket (state, socket) {
      Vue.set(state, 'socket', socket)
    },
    setEventOutput (state, payload) {
      Vue.set(state.events, payload.eventName, payload.eventData)
    },
    removeEventOutput (state, eventName) {
      Vue.set(state.events, eventName, {})
    },
    removeError (state) {
      Vue.set(state, 'hasError', false)
    },
    unsubscribe (state, channel) {
      Vue.set(state, 'subscribed', null)
      return state.socket.unsubscribe(channel)
    },
    subscribe (state, channel) {
      Vue.set(state, 'subscribed', channel)
      return state.socket.subscribe(channel)
    },
    watch (state, channel) {
      Vue.set(state, 'watching', channel)
      // return state.socket.watch(channel)
    },
    unwatch (state, channel) {
      Vue.set(state, 'watching', null)
      return state.socket.unwatch(channel)
    }
  },
  getters: {
    isLoading: state => {
      return state.isLoading
    },
    error: state => {
      return state.events.error
    },
    state: state => {
      if (!state.socket) return null
      return state.socket.state
    },
    events: state => {
      return state.events
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

    watch ({ state, commit, rootGetters, rootState }) {
      console.log('go watch')
      const selectedExchange = rootGetters['exchanges/selected']
      const channel = `TICKERS~${selectedExchange.toUpperCase()}~NEW`
      commit('watch', channel)

      return state.socket.watch(channel, (data) => {
        console.log('watch:', data)
        commit('tickers/setTickers', data, { root: true })
      })
    },

    subscribe ({ state, commit, rootGetters }) {
      const selectedExchange = rootGetters['exchanges/selected']
      const channel = `TICKERS~${selectedExchange.toUpperCase()}~NEW`
      return commit('subscribe', channel)
    },

    unsubscribe ({ commit, rootGetters }) {
      const selectedExchange = rootGetters['exchanges/selected']
      const channel = `TICKERS~${selectedExchange.toUpperCase()}~NEW`
      return commit('unsubscribe', channel)
    },

    connect ({ commit, rootGetters }) {
      const socket = websocketConnect()
      commit('addSocket', socket)

      // const selectedExchange = rootGetters['exchanges/selected']
      // const exchangeDataChannel = socket.subscribe(`TICKERS~${selectedExchange.toUpperCase()}~NEW`)

      // exchangeDataChannel.watch(function (response) {
      //   console.log('Received Exchange Data:', response)
      //   // const markets = Object.values(response.data)
      //   commit('markets/addAllMarkets', response, {root: true})
      //   // context.commit('addPriceIndexes', response.data)
      // })

      socket.on('subscribe', function (channelname) {
        console.log('subscribe:' + channelname)
        commit('setEventOutput', {
          eventName: 'subscribe',
          eventData: channelname
        })
      })

      socket.on('connect', function (socket) {
        console.log('connect:', socket)
        commit('setEventOutput', {
          eventName: 'connect',
          eventData: socket
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
        // commit('setEventOutput', {
        //   eventName: 'message',
        //   eventData: 1
        // })
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
