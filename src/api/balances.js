import axios from '@/axios'

export function getAllBalances (forceRefresh = false, exchange) {
  const forceRefreshParam = (forceRefresh) ? '?forceRefresh=true' : ''
  return axios.get(`http://localhost:5000/exchanges/${exchange}/balances${forceRefreshParam}`).then(response => response.data)
  // return Promise.resolve(require('@/services/api/mocks/balances.json'))
}
