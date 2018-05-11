import axios from '../axios'

export function getAllKeys () {
  return axios.get(`/keys`)
    .then(response => response.data)
}

export function createKey (apiKey, apiSecret, exchangeId) {
  return axios.post(`/keys`, {
    apiKey: apiKey,
    apiSecret: apiSecret,
    exchangeId: exchangeId
  })
    .then(response => response.data)
}

export function updateKey (apiKey, apiSecret, exchangeId) {
  return axios.patch(`/keys`, {
    apiKey: apiKey,
    apiSecret: apiSecret,
    exchangeId: exchangeId
  })
    .then(response => response.data)
}
