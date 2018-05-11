export default {
  isOnline: state => {
    return state.isOnline
  },
  marketFavorites: state => {
    return state.marketFavorites
  },
  user: state => {
    return state.user
  },
  isLoading: state => {
    return state.isLoading
  },
  error: state => {
    return state.error
  },
  success: state => {
    return state.success
  },
  isOnboarded: state => {
    return (state.user) ? state.user.onboarded : false
  }
}
