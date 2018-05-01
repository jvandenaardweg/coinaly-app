import axios from '../axios'

export function create (email, password) {
  return axios.post('/users', {
    email: email,
    password: password
  })
    .then(response => response.data)
}
