require('isomorphic-fetch')

let baseUrl

if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://api.coinaly.io'
} else {
  baseUrl = 'http://localhost:5000'
}

var axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000
})

if (window.localStorage) {

} else {
  delete axios.defaults.headers.common['authorization']
}

const request = function (url, method) {
  let headers = null
  const token = localStorage.getItem('token')
  headers = new Headers({'Authorization': token})

  const options = {
    method: method,
    headers: headers
  }

  return fetch(url, options)
}

module.exports = axiosInstance
