import axios from '../axios'

export function login (email, password) {
  return axios.post('/auth/login', {
    email: email,
    password: password
  })
    .then(response => response.data)
}

export function verify (verificationCode) {
  return axios.post('/auth/verify', {
    verification: verificationCode
  })
    .then(response => response.data)
}
