
import AuthorRequest from '../interfaces/AuthorRequest'
import AuthorResponse from '../interfaces/AuthorResponse'
import { baseAxios } from './api.service'

export const getAuthors = ()  => baseAxios.get<AuthorResponse[]>('/Authors')
export const create = (authorRequest: AuthorRequest)  => baseAxios.post('/Authors', authorRequest)
