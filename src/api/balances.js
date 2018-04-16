import axios from '@/axios'

let baseUrl

if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://api.coinaly.io'
} else {
  baseUrl = 'http://localhost:5000'
}

export function getAllBalances (forceRefresh = false, exchange) {
  const forceRefreshParam = (forceRefresh) ? '?forceRefresh=true' : ''

  return axios.get(`${baseUrl}/exchanges/${exchange}/balances${forceRefreshParam}`).then(response => response.data)
  // return Promise.resolve(require('@/services/api/mocks/balances.json'))
}
