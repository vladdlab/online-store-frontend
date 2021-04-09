import axios from 'axios'

axios.defaults.headers.common['accept-language'] = 'ru'

const baseURL = 'http://localhost:8002'

const API = axios.create({
  baseURL: baseURL
})

export default API
