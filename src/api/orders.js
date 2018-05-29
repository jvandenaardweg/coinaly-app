import axios from '../axios'
require('isomorphic-fetch')
export function getAllClosedOrders (exchangeSlug, symbolId = null, forceRefresh = false) {
  return axios.get(`/exchanges/${exchangeSlug}/orders/closed`, {
    params: {
      ...symbolId,
      ...forceRefresh
    }
  })
    .then(response => response.data)
}

export function getAllOpenOrders (exchangeSlug, symbolId = null, forceRefresh = false) {
  return axios.get(`/exchanges/${exchangeSlug}/orders/open`, {
    params: {
      ...symbolId,
      ...forceRefresh
    }
  })
    .then(response => response.data)
}

export function createLimitOrder (exchangeSlug, side, symbol, amount, price) {
  return axios.post(`/exchanges/${exchangeSlug}/orders/limit`, {
    side: side,
    symbol: symbol,
    amount: amount,
    price: price
  })
    .then(response => response.data)
}

export function cancelOrder (exchangeSlug, orderUuid) {
  // return fetch(`http://localhost:5000/exchanges/${exchangeSlug}/orders/${orderUuid}`, {
  //     method: 'delete'
  //   })
  //   .then(result => result.json())
  return axios.delete(`/exchanges/${exchangeSlug}/orders/${orderUuid}`)
    .then(response => response.data)
}
