const initialIsOnline = window.navigator.onLine

export default {
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
