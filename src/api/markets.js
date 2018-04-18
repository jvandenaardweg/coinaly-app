import axios from '../axios'

export function loadAllMarkets (forceRefresh = false, exchange) {
  const forceRefreshParam = (forceRefresh) ? '?forceRefresh=true' : ''
  return axios.get(`/exchanges/${exchange}/markets/load${forceRefreshParam}`).then(response => response.data)
  // return Promise.resolve(require('@/services/api/mocks/balances.json'))
}
