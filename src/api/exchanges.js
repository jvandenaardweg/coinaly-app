import axios from '../axios'

export function getAllExchanges () {
  return axios.get(`/exchanges`)
    .then(response => response.data)
}
