export default () => {
  return {
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
    socket: null,
    isDelayed: false,
    delayTimeout: 10000
  }
}
