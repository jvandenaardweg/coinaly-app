import { websocketConnect } from '../../../websocket'

let timeout = null

export default {
  watch ({ state, commit, rootGetters, rootState }) {
    const tickersChannel = rootGetters['exchanges/tickersChannel']
    console.log('Websocket Watch:', tickersChannel)
    commit('watch', tickersChannel)

    return window.socket.watch(tickersChannel, (data) => {
      // Method to determine if websocket data is delayed
      // If so, we display a message to the user, so the user knows it is not seeing realtime data
      commit('removeDelayed')
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        commit('setDelayed')
      }, state.delayTimeout)

      commit('tickers/setTickers', data, { root: true })

      if (rootGetters['tickers/isLoading']) {
        commit('tickers/stopLoading', null, { root: true })
      }
    })
  },

  subscribe ({ state, commit, rootGetters }) {
    clearTimeout(timeout)
    const tickersChannel = rootGetters['exchanges/tickersChannel']
    console.log('Websocket Subscribe:', tickersChannel)
    commit('subscribe', tickersChannel)
    return window.socket.subscribe(tickersChannel)
  },

  unsubscribe ({ commit, rootGetters }) {
    clearTimeout(timeout)
    const tickersChannel = rootGetters['exchanges/tickersChannel']
    console.log('Websocket Unsubscribe:', tickersChannel)
    commit('unsubscribe', tickersChannel)
    window.socket.unwatch(tickersChannel)
    return window.socket.unsubscribe(tickersChannel)
  },

  disconnect () {
    clearTimeout(timeout)
    window.socket.disconnect()
  },

  connect ({ commit, rootGetters }) {
    window.socket = websocketConnect()

    window.socket.on('connect', function (data) {
      console.log('Websocket Event (connect):', data)
      commit('removeEventOutput', 'error')
      commit('setEventOutput', {
        eventName: 'connect',
        eventData: data
      })
    })

    window.socket.on('disconnect', function (data) {
      console.log('Websocket Event (disconnect):', data)
      commit('setEventOutput', {
        eventName: 'disconnect',
        eventData: data
      })
    })

    window.socket.on('close', function (data) {
      console.log('Websocket Event (close):', data)
      commit('setEventOutput', {
        eventName: 'close',
        eventData: data
      })
    })

    window.socket.on('subscribe', function (channelname) {
      console.log('Websocket Event (subscribe):', channelname)
      commit('setEventOutput', {
        eventName: 'subscribe',
        eventData: channelname
      })
    })

    window.socket.on('unsubscribe', function (channelname) {
      console.log('Websocket Event (unsubscribe):' + channelname)
      commit('setEventOutput', {
        eventName: 'unsubscribe',
        eventData: channelname
      })
    })

    window.socket.on('error', function (data) {
      console.log('Websocket Event (error):', data)
      commit('setEventOutput', {
        eventName: 'error',
        eventData: data
      })
    })

    window.socket.on('subscribeFail', function (channelname) {
      console.log('Websocket Event (subscribeFail):' + channelname)
      commit('setEventOutput', {
        eventName: 'subscribeFail',
        eventData: channelname
      })
    })

    window.socket.on('subscribeStateChange', function (data) {
      console.log('Websocket Event (subscribeStateChange):' + JSON.stringify(data))
      commit('setEventOutput', {
        eventName: 'subscribeStateChange',
        eventData: data
      })
    })

    // window.socket.on('message', function (data) {
    //   // commit('setEventOutput', {
    //   //   eventName: 'message',
    //   //   eventData: 1
    //   // })
    // })

    window.socket.on('kickOut', function (data) {
      console.log('Websocket Event (kickOut):', data)
      commit('setEventOutput', {
        eventName: 'kickOut',
        eventData: data
      })
    })
  }
}
