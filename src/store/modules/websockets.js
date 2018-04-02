import socketCluster from 'socketcluster-client'
// More: https://github.com/SocketCluster/socketcluster-client#connect-options
var options = {
  hostname: 'socket.coinaly.io',
  secure: true,
  port: 443,
  rejectUnauthorized: false, // Only necessary during debug if using a self-signed certificate
  connectTimeout: 5000, // milliseconds
  ackTimeout: 5000, // milliseconds
  autoReconnectOptions: {
    initialDelay: 5000, // milliseconds
    randomness: 5000, // milliseconds
    multiplier: 1.5, // decimal
    maxDelay: 3000 // milliseconds
  }
}

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
    }
  },
  mutations: {
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
    connect (context, exchangeName) {
      var socket = socketCluster.create(options)

      const exchangeDataChannel = socket.subscribe(`markets--${exchangeName}`)
      exchangeDataChannel.watch(function (response) {
        console.log('Received Exchange Data:', response)
        // const markets = Object.values(response.data)
        context.commit('markets/addAllMarkets', response.data, {root: true})
        // context.commit('addPriceIndexes', response.data)
      })

      socket.on('subscribe', function (channelname) {
        console.log('subscribe:' + channelname)
        context.commit('setEventOutput', {
          eventName: 'subscribe',
          eventData: channelname
        })
      })

      socket.on('subscribeFail', function (channelname) {
        console.log('subscribeFail:' + channelname)
        context.commit('setEventOutput', {
          eventName: 'subscribeFail',
          eventData: channelname
        })
      })

      socket.on('unsubscribe', function (channelname) {
        console.log('unsubscribe:' + channelname)
        context.commit('setEventOutput', {
          eventName: 'unsubscribe',
          eventData: channelname
        })
      })

      socket.on('subscribeStateChange', function (data) {
        console.log('subscribeStateChange:' + JSON.stringify(data))
        context.commit('setEventOutput', {
          eventName: 'subscribeStateChange',
          eventData: data
        })
      })

      socket.on('message', function (data) {
        // console.log('message:' + data)
      })

      socket.on('error', function (data) {
        context.commit('setEventOutput', {
          eventName: 'error',
          eventData: data
        })
        console.log('Socketcluster Error', data)
      })

      socket.on('connect', function (data) {
        console.log('Socketcluster Connect', data)
        context.commit('removeEventOutput', 'error')
        context.commit('setEventOutput', {
          eventName: 'connect',
          eventData: data
        })
      })

      socket.on('disconnect', function (data) {
        console.log('Socketcluster Disconnect', data)
        context.commit('setEventOutput', {
          eventName: 'disconnect',
          eventData: data
        })
      })

      socket.on('close', function (data) {
        console.log('Socketcluster Close', data)
        context.commit('setEventOutput', {
          eventName: 'close',
          eventData: data
        })
      })

      socket.on('kickOut', function (data) {
        console.log('Socketcluster KickOut', data)
        context.commit('setEventOutput', {
          eventName: 'kickOut',
          eventData: data
        })
      })
    }
  }
}
