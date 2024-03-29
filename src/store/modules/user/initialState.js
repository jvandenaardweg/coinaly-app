const initialIsOnline = window.navigator.onLine || null

export default () => {
  return {
    user: null,
    isLoading: null,
    error: null,
    success: null,
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
}
