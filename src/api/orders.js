import axios from '../axios'

export function getAllClosedOrders (exchangeSlug, symbolId = null) {
  return axios.get(`/exchanges/${exchangeSlug}/orders/closed`, {
    params: {
      symbolId: symbolId
    }
  })
    .then(response => response.data)
}

export function getAllOpenOrders (exchangeSlug, symbolId = null) {
  return axios.get(`/exchanges/${exchangeSlug}/orders/open`, {
    params: {
      symbolId: symbolId
    }
  })
    .then(response => response.data)
}
