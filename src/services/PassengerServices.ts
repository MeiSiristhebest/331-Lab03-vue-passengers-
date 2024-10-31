import axios from 'axios'

const apiClient = axios.create({
  baseURL:
    'https://api.instantwebtools.net/v1/passenger',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getDatas(perPage: number, page: number) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getData(_id: string) {
    return apiClient.get('/data/' + _id)
  },
}
