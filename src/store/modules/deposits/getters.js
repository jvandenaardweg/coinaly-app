export default {
  addresses: state => {
    return state.addresses
  },
  getAddressBySymbol: state => (symbol) => {
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
