import axios from '../axios'

export function getAllClosedOrders (exchangeSlug, symbolId = null) {
  return axios.get(`/exchanges/${exchangeSlug}/orders/closed`, {
    params: {
      symbolId: symbolId
    }
  })
    .then(response => response.data)
}
