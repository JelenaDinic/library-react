import axios from 'axios'

export const baseAxios = axios.create({ baseURL: 'https://library-practice-app.azurewebsites.net/api' })
