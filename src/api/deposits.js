import axios from '../axios'

export function getDepositAddress (symbolId, exchange, forceRefresh = false) {
  return axios.get(`/exchanges/${exchange}/deposits/address`, {
    params: {
      symbolId: symbolId,
      forceRefresh: forceRefresh
    }
  })
    .then(response => response.data)
}
