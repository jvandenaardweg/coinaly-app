var axios = require('axios')
require('promise.prototype.finally')

let baseUrl

if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://api.coinaly.io'
} else {
  baseUrl = 'http://localhost:5000'
}

var axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000
})

if (window.localStorage) {
  const token = localStorage.getItem('token')
  axios.defaults.headers.common['authorization'] = token
} else {
  delete axios.defaults.headers.common['authorization']
}

module.exports = axiosInstance
