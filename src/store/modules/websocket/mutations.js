import Vue from 'vue'
import initialState from '@/store/modules/websocket/initialState'

export default {
  setEventOutput (state, payload) {
    Vue.set(state.events, payload.eventName, payload.eventData)
  },
  removeEventOutput (state, eventName) {
    Vue.set(state.events, eventName, {})
  },
  unsubscribe (state, channel) {
    Vue.set(state, 'subscribed', null)
  },
  subscribe (state, channel) {
    Vue.set(state, 'subscribed', channel)
    // return window.socket.subscribe(channel)
  },
  watch (state, channel) {
    Vue.set(state, 'watching', channel)
    // return window.socket.watch(channel)
  },
  unwatch (state, channel) {
    Vue.set(state, 'watching', null)
    // return window.socket.unwatch(channel)
  },
  setDelayed (state) {
    Vue.set(state, 'isDelayed', true)
  },
  removeDelayed (state) {
    Vue.set(state, 'isDelayed', false)
  },
  resetState (state) {
    const s = initialState()
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  }
}
