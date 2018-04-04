import axios from '@/axios'

export function getAllBalances () {
  return axios.get('http://localhost:5000/balances').then(response => response.data)
  // return Promise.resolve(require('@/services/api/mocks/balances.json'))
}
