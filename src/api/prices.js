import axios from '../axios'

export function getAllPrices () {
  return axios.get(`/prices`)
    .then(response => response.data)
}

export function getAllPricesHistory (baseId, quoteId, interval) {
  return axios.get(`/prices/history`, {
    params: {
      baseId: baseId,
      quoteId: quoteId,
      interval: interval
    }
  })
    .then(response => response.data)
}
