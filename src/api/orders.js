import axios from '../axios'

export function getAllClosedOrders (exchangeSlug) {
  return axios.get(`/exchanges/${exchangeSlug}/orders/closed`)
    .then(response => response.data)
}
