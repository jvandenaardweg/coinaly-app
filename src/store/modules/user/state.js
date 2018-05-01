const initialIsOnline = window.navigator.onLine

export default {
  user: null,
  isLoading: false,
  error: null,
  isOnline: initialIsOnline,
  marketFavorites: {
    'bittrex': {
      'LTC/BTC': true,
      'ADA/BTC': true
    },
    'binance': {},
    'poloniex': {}
  }
}
