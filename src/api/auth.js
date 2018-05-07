import axios from '../axios'

export function login (email, password) {
  return axios.post('/auth/login', {
    email: email,
    password: password
  })
    .then(response => response.data)
}

export function verify (verificationToken) {
  return axios.post('/auth/verify', {
    verificationToken: verificationToken
  })
    .then(response => response.data)
}

export function requestResetToken (email) {
  return axios.post('/auth/reset', {
    email: email
  })
    .then(response => response.data)
}

export function resetPassword (password, resetToken) {
  return axios.post('/auth/reset/password', {
    password: password,
    resetToken: resetToken
  })
    .then(response => response.data)
}
