import axios from 'axios'

export const baseAxios = axios.create({ baseURL: 'https://library-practice-app.azurewebsites.net/api' })
baseAxios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
