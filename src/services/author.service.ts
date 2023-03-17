
import AuthorRequest from '../interfaces/AuthorRequest'
import AuthorResponse from '../interfaces/AuthorResponse'
import { baseAxios } from './api.service'

const getAuthors = ()  => baseAxios.get<AuthorResponse[]>('/Authors')
const createAuthor = (authorRequest: AuthorRequest)  => baseAxios.post('/Authors', authorRequest)

export default {
  getAuthors,
  createAuthor
}
