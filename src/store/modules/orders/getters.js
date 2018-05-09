export default {
  closed: state => {
    return state.closed
  },
  hasClosed: state => {
    return (state.closed) ? state.closed.length > 0 : false
  },
  isLoading: state => {
    return state.isLoading
  },
  error: state => {
    return state.error
  }
}
