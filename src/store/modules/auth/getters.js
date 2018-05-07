export default {
  isAuthenticated: state => {
    return state.isAuthenticated
  },
  isLoading: state => {
    return state.isLoading
  },
  token: state => {
    return state.token
  },
  error: state => {
    return state.error
  },
  isVerified: state => {
    return state.isVerified
  },
  success: state => {
    return state.success
  }
}
