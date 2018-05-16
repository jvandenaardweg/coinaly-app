export default {
  addresses: state => {
    return state.addresses
  },
  getAddressBySymbol: state => (symbol) => {
    // TODO: write test
    if (state.addresses && state.addresses[symbol]) {
      return state.addresses[symbol].address
    } else {
      return null
    }
  },
  isLoading: state => {
    return state.isLoading
  },
  error: state => {
    return state.error
  },
  success: state => {
    return state.success
  }
}
