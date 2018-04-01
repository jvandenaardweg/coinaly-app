import axios from '../../axios'
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import socket from '../../socketcluster'
import pickBy from 'lodash/pickBy'
Vue.use(VueCookie)

const selectedMarketCookie = Vue.cookie.get('selectedMarket') || null
const initialSelectedMarket = (selectedMarketCookie === 'null' ? null : selectedMarketCookie)

function filterMarkets (array, symbol) {
  return pickBy(array, (values, marketSymbol) => {
    return marketSymbol.includes(symbol)
  })
}

// function filterMarkets (array, symbol) {
//   return array.filter(market => {
//     return market.symbol.includes(symbol) // Symbol is something like: XRP/BTC or ETH/BTC (where /BTC is the main market)
//   })
// }

// function reduceQuoteVolume (array) {
//   return array.reduce((total, number) => {
//     return total + number.quoteVolume
//   }, 0)
// }

export default {
  namespaced: true,
  state: {
    markets: [],
    isLoading: true,
    selectedMarket: initialSelectedMarket,
    priceIndexes: null
  },
  mutations: {
    addAllMarkets (state, markets) {
      state.markets = markets
    },
    // addPriceIndexes (state, markets) {
    //   let payload = {
    //     'BTC/USDT': {},
    //     'ETH/USDT': {}
    //   }
    //   const filteredMarkets = markets.filter(market => {
    //     return market.symbol === 'BTC/USDT' || market.symbol === 'ETH/USDT'
    //   }, 0)

    //   filteredMarkets.forEach(market => {
    //     if (market.symbol === 'BTC/USDT') {
    //       payload[market.symbol].rate = market.last
    //     } else if (market.symbol === 'ETH/USDT') {
    //       payload[market.symbol].rate = market.last
    //     }
    //   })

    //   state.priceIndexes = payload
    // },
    startLoading (state) {
      state.isLoading = true
    },
    stopLoading (state) {
      state.isLoading = false
    },
    setSelectedMarket (state, market) {
      if (process.env.NODE_ENV === 'production') {
        Vue.cookie.set('selectedMarket', market, { expires: '99Y', domain: 'coinaly.io' })
      } else {
        Vue.cookie.set('selectedMarket', market, { expires: '99Y', domain: 'localhost' })
      }
      state.selectedMarket = market
    },
    removeSelectedMarket (state) {
      state.selectedMarket = null
      Vue.cookie.delete('selectedMarket')
    }
  },
  getters: {
    priceIndexes: state => {
      return state.priceIndexes
    },
    selectedMarket: state => {
      return state.selectedMarket
    },
    allMarkets: state => {
      return state.markets
    },
    allBTCMarkets: state => {
      return filterMarkets(state.markets, '/BTC')
    },
    allETHMarkets: state => {
      return filterMarkets(state.markets, '/ETH')
    },
    allUSDTMarkets: state => {
      return filterMarkets(state.markets, '/USDT')
    },
    BTCUSDTMarket: state => {
      return filterMarkets(state.markets, 'BTC/USDT')[0]
    },
    // totalVolume: state => {
    //   if (state.markets.length) {
    //     return reduceQuoteVolume(state.markets)
    //   } else {
    //     return null
    //   }
    // },
    // totalBtcVolume: state => {
    //   if (state.markets.length) {
    //     const filteredMarkets = filterMarkets(state.markets, '/BTC')
    //     return reduceQuoteVolume(filteredMarkets)
    //   } else {
    //     return null
    //   }
    // },
    // totalEthVolume: state => {
    //   if (state.markets.length) {
    //     const filteredMarkets = filterMarkets(state.markets, '/ETH')
    //     return reduceQuoteVolume(filteredMarkets)
    //   } else {
    //     return null
    //   }
    // },
    // totalUsdVolume: state => {
    //   if (state.markets.length) {
    //     const filteredMarkets = filterMarkets(state.markets, '/USDT')
    //     return reduceQuoteVolume(filteredMarkets)
    //   } else {
    //     return null
    //   }
    // },
    isLoading: state => {
      return state.isLoading
    }
  },
  actions: {
    getAll (context) {
      context.commit('startLoading')
      return axios.get(`tickers`)
        .then(response => {
          const markets = Object.values(response.data)
          context.commit('addAllMarkets', markets)
          context.commit('addPriceIndexes', markets)
        })
        .catch(error => {
          console.error('Failed to get the markets.', error)
        })
        .finally(() => {
          context.commit('stopLoading')
        })
    },
    listenTickers (context) {
      const exchangeDataChannel = socket.subscribe('markets--bittrex')
      exchangeDataChannel.watch(function (response) {
        console.log('Received Exchange Data:', response)
        // const markets = Object.values(response.data)
        context.commit('addAllMarkets', response.data)
        // context.commit('addPriceIndexes', response.data)
      })
    }
  }
}
