import Vue from 'vue'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

const initialSelectedExchange = Vue.cookie.get('selectedExchange') || null

export default () => {
  return {
    exchanges: null,
    isLoading: null,
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
