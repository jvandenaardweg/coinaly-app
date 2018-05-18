import axios from '../axios'

export function loadAllMarkets (forceRefresh = false, exchange) {
  return axios.get(`/exchanges/${exchange}/markets/load`, {
    params: {
      forceRefresh: forceRefresh
    }
  })
    .then(response => response.data)
}

export function getOHLCV (exchange, marketSymbol, interval, forceRefresh = false) {
  return axios.get(`/exchanges/${exchange}/markets/ohlcv`, {
    params: {
      marketSymbol: marketSymbol,
      interval: interval,
      forceRefresh: forceRefresh
    }
  })
    .then(response => response.data)
}
