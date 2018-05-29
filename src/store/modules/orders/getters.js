export default {
  closed: state => {
    return state.closed
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
  isLoading: state => {
    return state.isLoading
  },
  error: state => {
    return state.error
  }
}
