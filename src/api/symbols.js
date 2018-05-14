import axios from '../axios'

export function getAllSymbols (forceRefresh = false, exchange) {
  return axios.get(`/symbols`)
    .then(response => response.data)
}
