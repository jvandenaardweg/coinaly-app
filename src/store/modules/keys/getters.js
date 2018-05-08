export default {
  keys: state => {
    return state.keys
  },
  hasKeys: state => {
    return (state.keys) ? (state.keys.length > 0) : false
  },
  isLoading: state => {
    return state.isLoading
  },
  error: state => {
    return state.error
  }
}
