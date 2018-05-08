import axios from '../axios'

export function create (email, password, emailOptIn) {
  return axios.post('/users', {
    email: email,
    password: password,
    emailOptIn: emailOptIn
  })
    .then(response => response.data)
}

export function getMe () {
  return axios.get('/users/me')
    .then(response => response.data)
}
