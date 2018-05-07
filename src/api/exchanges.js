import axios from '../axios'

export function getAllExchanges () {
  return axios.get(`/exchanges/all`)
    .then(response => response.data)
}
