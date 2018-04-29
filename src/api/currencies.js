import axios from '../axios'

export function getAllCurrencies (forceRefresh = false, exchange) {
  const forceRefreshParam = (forceRefresh) ? '?forceRefresh=true' : ''

  return axios.get(`/currencies${forceRefreshParam}`)
    .then(response => response.data)
}
