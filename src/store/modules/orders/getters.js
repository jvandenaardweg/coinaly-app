export default {
  closed: state => {
    if (state.closed && state.closed.length) {
      return state.closed.sort((a, b) => b.timestamp - a.timestamp)
    } else {
      return []
    }
  },
  open: state => {
    // TODO: write test
    return state.open
  },
  hasClosed: state => {
    return (state.closed) ? state.closed.length > 0 : false
  },
  hasOpen: state => {
    // TODO: write test
    return (state.open) ? state.open.length > 0 : false
  },
  totalOpenOrders: state => {
    // TODO: write test
    return (state.open) ? state.open.length : 0
  },
  isLoading: state => {
    return state.isLoading
  },
  error: state => {
    return state.error
  }
}
