import { baseAxios } from './api.service'

export const createBook = (formData: FormData)  => baseAxios.post('/Books', formData)
