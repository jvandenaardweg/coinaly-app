export default {
  error: state => {
    return state.events.error
  },
  isDelayed: state => {
    return state.isDelayed
  },
  delayTimeout: state => {
    return state.delayTimeout
  }
}
