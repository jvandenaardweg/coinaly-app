import axios from '../axios'

export function getAllKeys () {
  return axios.get(`/keys`)
    .then(response => response.data)
}
