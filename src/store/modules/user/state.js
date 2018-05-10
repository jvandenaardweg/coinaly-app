const initialIsOnline = window.navigator.onLine || null

export default {
  user: null,
  isLoading: null,
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
