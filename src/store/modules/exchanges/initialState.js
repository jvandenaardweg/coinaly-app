let initialSelectedExchange = null

if (window.localStorage) {
  initialSelectedExchange = window.localStorage.getItem('selectedExchange') || null
}

export default () => {
  return {
    exchanges: null,
    isLoading: null,
    error: null,
    selected: initialSelectedExchange,
    available: {
      'bittrex': {
        name: 'Bittrex'
      },
      'binance': {
        name: 'Binance'
      },
      'poloniex': {
        name: 'Poloniex'
      }
    }
  }
}
