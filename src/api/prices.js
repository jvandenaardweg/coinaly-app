import axios from '../axios'

export function getAllPrices (exchangeSlug) {
  return axios.get(`/prices`)
    .then(response => response.data)
}
